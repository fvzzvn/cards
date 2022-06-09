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
            this.Clients.Caller.playerJoined(player);


            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

        }
        public Task LeaveRoom(string roomId)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        }
    }
}
