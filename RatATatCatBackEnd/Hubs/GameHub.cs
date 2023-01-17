using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Interfaces;
using RatATatCatBackEnd.Models.Database;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        private readonly IGameState _gameState;
        private readonly IServiceProvider _serviceProvider;
        private readonly IParticipant _participants;
        private readonly IBoardInstance _boards;
        private readonly IRankingService _rankingService;
        public GameHub(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _gameState = _serviceProvider.GetRequiredService<IGameState>();
            _participants = _serviceProvider.GetRequiredService<IParticipant>();
            _boards = _serviceProvider.GetRequiredService<IBoardInstance>();
            _rankingService = _serviceProvider.GetRequiredService<IRankingService>();
        }
        public async Task JoinRoom(string gameId, string username)
        {
            if (_gameState.GetGame(gameId) == null)
            {
                await _gameState.CreateGame(gameId);
            }
            IGame game = _gameState.GetGame(gameId);
            Player player = _gameState.CreatePlayer(gameId, username, Context.ConnectionId);

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).playerJoined(player);
            await Clients.Caller.gameStatus(game);

            // add participant
            _participants.AddParticipantByUserName(username, Int32.Parse(gameId));

            if (_gameState.ArePlayersReady(gameId))
            {
                await Clients.Group(gameId).start(game);
            }
        }

        public async Task PlayCard(Card card)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            game.PlayCard(card, player);

            // invoke playerPlayedCard on front
            await Clients.Group(game.Id).playerPlayedCard(player, card, game);
            if (card.IsSpecial)
            {
                await Clients.Caller.playerPlayedSpecialCard(player, card, game);
            }
            if (game.RoundEnded)
            {
                game.RoundOver();
                // send cards;
                List<List<Card>> cards = new List<List<Card>>
                {
                    game.Player1.Cards,
                    game.Player2.Cards,
                    game.Player3.Cards,
                    game.Player4.Cards
                };
                await Clients.Group(game.Id).roundResults(game.RoundResult, game.GameResult, cards);
                game.NewRound();
                await Clients.Group(game.Id).newRound(game);
            }
            if (game.GameEnded)
            {
                var mmrs = _rankingService.Calculate(game.GameResult);
                await Clients.Group(game.Id).gameResults(game.GameResult, mmrs);
                _gameState.RemoveGame(game.Id);
                _boards.RemoveBoard(Int16.Parse(game.Id));
            }
        }
        public async Task PlayedSpecialCard(Card card, List<string>? players, List<Card>? cards)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);
            List<Player> playersList = new List<Player>();
            foreach(string p in players)
            {
                playersList.Add(_gameState.GetPlayer(p));
            }

            game.ApplySpecialCardEffect(card, playersList, cards);

            await Clients.Group(game.Id).applySpecialCardEffect(card, player, game, playersList, cards);
        }
        public async Task GetCard(string from)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            // get card
            Card card;

            if (game.PlayerTurn == player)
            {
                // give card to player 
                card = game.GiveCard(player, from);
                // notify others that player took card
                await Clients.Group(game.Id).playerTookCard(player, card, game);
                // next players turn to play his card
                // this might cause problems -> first player took card but didnt play any, second player if fast enought might do his turn before first player.
                game.NextTurn();
            }
            else
            {
                await Clients.Caller.notPlayersTurn();
            }
        }
        public async Task RatATatCatEnding()
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            game.RoundEnding = true;
            await Clients.Group(game.Id).roundEnding();
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
            if (game.IsEmpty())
                _boards.RemoveBoard(Int16.Parse(game.Id));

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);

            await Clients.Group(player.GameId).receiveMessage(player.Name, message);
        }
    }
}
