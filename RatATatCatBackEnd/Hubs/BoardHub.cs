using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interface;

namespace RatATatCatBackEnd.Hubs
{
    public class BoardHub : Hub<IBoardHub>
    {
        public async Task CallRefresh()
        {
            await Clients.All.RefreshRoom();
        }
    }
}
