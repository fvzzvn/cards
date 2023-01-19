using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Hubs
{
    public class DragonGameHub : Hub<IDragonGameHub>
    {
        private readonly IGameState _gameState;
        private readonly IServiceProvider _serviceProvider;
        private readonly IParticipant _participants;
        private readonly IBoardInstance _boards;
        public DragonGameHub(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _gameState = _serviceProvider.GetRequiredService<IGameState>();
            _participants = _serviceProvider.GetRequiredService<IParticipant>();
            _boards = _serviceProvider.GetRequiredService<IBoardInstance>();
        }

        public async Task JoinRoom(string gameId, int mode, string username)
        {
            if (_gameState.GetGame(gameId) == null)
            {
                await _gameState.CreateGame(gameId, mode);
            }

            Player player = _gameState.CreatePlayer(gameId, username, Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).playerJoined(player);
            
            if (_gameState.ArePlayersReady(gameId))
            {
                IGame game = _gameState.GetGame(gameId);
                await Clients.All.start(game);
            }
        }

        public async Task PlayCard(Card card, int position)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            if (game.PlayerTurn != player)
                await Clients.Caller.notPlayersTurn();
            else
            {
                // position 6 discard to stack1, position 7 discard to stack2
                if (!card.IsSpecial)
                    game.PlayCard(card, player, position);
                if (card.IsSpecial)
                    // invoke another endpoint on front with parameters
                    await Clients.Caller.playerPlayedSpecialCard(player, card, game);
                if (game.RoundEnded)
                {
                    game.RoundOver();
                    await Clients.Group(game.Id).roundResults(game.RoundResult);
                    game.NewRound();
                    await Clients.Group(game.Id).newRound(game);
                }
                if (game.GameEnded)
                {
                    await Clients.Group(game.Id).gameResults(game.GameResult);
                    _gameState.RemoveGame(game.Id);
                    _boards.RemoveBoard(Int16.Parse(game.Id));
                }
            }
        }
        
        public async Task PlayedSpecialCard(Card card, int[]? positions)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            game.ApplySpecialCardEffect(card, player, positions);

            await Clients.Group(game.Id).applySpecialCardEffect(card, player, game);
        }

        public async Task GetCard(string from)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            if (!game.PlayerTurn.Equals(player))
                await Clients.Caller.notPlayersTurn();
            else
            {
                // on front dont allow get from stack if empty
                Card card = game.GiveCard(player, from);
                await Clients.Group(game.Id).playerTookCard(player, card, game, from);
            }
        }

        public async Task EndTurn()
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            if (game.PlayerTurn != player)
                await Clients.Caller.notPlayersTurn();
            else
            {
                game.NextTurn();
                await Clients.Group(game.Id).nextTurn(game);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            if (_gameState.ArePlayersReady(game.Id))
            {
                // TODO, game is being played
            }
            else
            {
                game.RemovePlayer(player);
                _participants.DeleteParticipant(
                    _participants.GetParticipantByUserName(player.Name)
                    .ParticipantId);
            }

            await base.OnDisconnectedAsync(exception);
        }

    }
}
