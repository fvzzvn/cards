using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Hubs
{
    public class CrowGameHub : Hub<ICrowGameHub>
    {
        private readonly IGameState _gameState;
        private readonly IServiceProvider _serviceProvider;
        private readonly IParticipant _participants;
        public CrowGameHub(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _gameState = _serviceProvider.GetRequiredService<IGameState>();
            _participants = _serviceProvider.GetRequiredService<IParticipant>();
        }

        public async Task JoinRoom(string gameId, string username)
        {
            if (_gameState.GetGame(gameId) == null)
            {
                await _gameState.CreateGame(gameId);
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

        public async Task PlayCard(Card card)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            if (game.PlayerTurn != player)
                await Clients.Caller.notPlayersTurn();
            else
            {
                if (card.IsSpecial)
                {
                    // here client will call 
                    await Clients.Caller.playerPlayedSpecialCard(player, card, game);
                }
                else await Clients.Group(game.Id).playerPlayedCard(player, card, game);

                if (game.GameEnded)
                {
                    await Clients.Group(game.Id).gameResults(game.GameResult);
                }
            }
        }
        
        public async Task PlayedSpecialCard(Card card, int[] positions)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            game.ApplySpecialCardEffect(card, player, positions);

            await Clients.Group(game.Id).applySpecialCardEffect(card, player, game);
        }

        public async Task GetCards(CrowCardRequest request)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            if (game.PlayerTurn != player)
                await Clients.Caller.notPlayersTurn();
            else
            {
                request.Player = player;
                game.GiveCard(request);
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
        public async Task SendMessage(string message)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);

            await Clients.Group(player.GameId).receiveMessage(player.Name, message);
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
