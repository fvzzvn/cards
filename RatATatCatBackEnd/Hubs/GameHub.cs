using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interfaces;

namespace RatATatCatBackEnd.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        public async Task JoinRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

        }
        public Task LeaveRoom(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
    }
}
