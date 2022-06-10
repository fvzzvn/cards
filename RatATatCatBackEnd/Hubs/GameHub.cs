using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interfaces;
using RatATatCatBackEnd.Models;

namespace RatATatCatBackEnd.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        public async Task JoinRoom(string roomId, string username)
        {
            if(GameState.Instance.GetGame(roomId) == null)
            {
                GameState.Instance.CreateGame(roomId);
            }

            Player player = 
                GameState.Instance.CreatePlayer(roomId, username, Context.ConnectionId);
            this.Clients.All.playerJoined(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            if (GameState.Instance.IsPlayersReady(roomId))
            {
                Game game = GameState.Instance.GetGame(roomId);
                this.Clients.All.start(game);
            }

        }
        public Task LeaveRoom(string roomId)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        }
    }
}
