using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interfaces;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        public async Task JoinRoom(string gameId, string username)
        {
            if (GameState.Instance.GetGame(gameId) == null)
            {
                await GameState.Instance.CreateGame(gameId);
            }

            Player player =
                GameState.Instance.CreatePlayer(gameId, username, Context.ConnectionId);
            await Clients.All.playerJoined(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);

            if (GameState.Instance.IsPlayersReady(gameId))
            {
                Game game = GameState.Instance.GetGame(gameId);
                await Clients.All.start(game);
            }

        }

        public async Task PlayCard(Card card)
        {
            Player player = GameState.Instance.GetPlayer(Context.ConnectionId);
            Game game = GameState.Instance.GetGame(player.GameId);

            game.PlayCard(card, player);

            await Clients.All.playerPlayedCard(player, card, game);
        }
        public async Task PlayCardAfterGet(Card card)
        {
            Player player = GameState.Instance.GetPlayer(Context.ConnectionId);
            Game game = GameState.Instance.GetGame(player.GameId);

            game.PlayCardAfterGet(card, player);

            await Clients.All.playerPlayedCard(player, card, game);
        }
        public async Task GetCard(string from)
        {
            Player player = GameState.Instance.GetPlayer(Context.ConnectionId);
            Game game = GameState.Instance.GetGame(player.GameId);

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
            Game game = GameState.Instance.GetGame(player.GameId);

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
            Player player = GameState.Instance.GetPlayer(Context.ConnectionId);

            await Clients.All.recieveMessage(player.Name, message);
        }
    }
}
