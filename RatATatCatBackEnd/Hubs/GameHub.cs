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
        public GameHub(IServiceProvider serviceProvider)
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

            // add participant
            _participants.AddParticipantByUserName(username, Int32.Parse(gameId));

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
            
            game.PlayCard(card, player);
            // invoke playerPlayedCard on front
            await Clients.Group(game.Id).playerPlayedCard(player, card, game);
            if (card.IsSpecial)
            {
                await Clients.Caller.playerPlayedSpecialCard(player, card, game);
            }
        }
        public async Task PlayedSpecialCard(Card card, List<Player>? players, List<Card>? cards)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            IGame game = _gameState.GetGame(player.GameId);

            game.ApplySpecialCardEffect(card, players, cards);

            await Clients.All.applySpecialCardEffect(card, player, game);
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
                game.NextTurn();
            }
            else
            {
                await Clients.Caller.notPlayersTurn();
            }
        }
        public async Task EndGame(Player player)
        {
            IGame game = _gameState.GetGame(player.GameId);

            _gameState.RemoveGame(player.GameId);

            await Clients.Group(game.Id).gameEnding();
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

        public async Task SendMessage(string message)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);

            await Clients.Group(player.GameId).receiveMessage(player.Name, message);
        }
    }
}
