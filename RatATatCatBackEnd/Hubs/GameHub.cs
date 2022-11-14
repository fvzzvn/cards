using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interfaces;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        private readonly IGameState _gameState;
        private readonly IServiceProvider _serviceProvider;
        public GameHub(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _gameState = _serviceProvider.GetRequiredService<IGameState>();
        }
        public async Task JoinRoom(string gameId, string username)
        {
            if (_gameState.GetGame(gameId) == null)
            {
                await _gameState.CreateGame(gameId);
            }

            Player player = _gameState.CreatePlayer(gameId, username, Context.ConnectionId);
            await Clients.All.playerJoined(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);

            if (_gameState.ArePlayersReady(gameId))
            {
                Game game = _gameState.GetGame(gameId);
                await Clients.All.start(game);
            }

        }

        public async Task PlayCard(Card card)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            Game game = _gameState.GetGame(player.GameId);

            game.PlayCard(card, player);

            await Clients.All.playerPlayedCard(player, card, game);
        }
        public async Task PlayCardAfterGet(Card card)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            Game game = _gameState.GetGame(player.GameId);

            game.PlayCardAfterGet(card, player);

            await Clients.All.playerPlayedCard(player, card, game);
        }
        public async Task GetCard(string from)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);
            Game game = _gameState.GetGame(player.GameId);

            Card card = new Card();

            if (game.PlayerTurn == player)
            {
                if (from == "dealer")
                {
                    game.Dealer.GiveCard(player);
                    await Clients.All.playerTookCard(player, card, game);
                    game.NextTurn();
                }
                else if (from == "stack")
                {
                    if (game.Stack.NotEmpty())
                    {
                        card = game.GetCardFromStack(player);
                        await Clients.All.playerTookCard(player, card, game);
                        game.NextTurn();
                    }
                    else
                    {
                        await Clients.Caller.stackEmpty();
                    }
                }
            }
            else
            {
                await Clients.Caller.notPlayersTurn();
            }
        }
        public async Task EndGame(Player player)
        {
            Game game = _gameState.GetGame(player.GameId);

            /* Todo
                game.End();
            */
            await Clients.All.gameEnding();
        }
        public Task LeaveRoom(string roomId)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        }

        public async Task SendMessage(string message)
        {
            Player player = _gameState.GetPlayer(Context.ConnectionId);

            await Clients.Group(player.GameId).recieveMessage(player.Name, message);
        }
    }
}
