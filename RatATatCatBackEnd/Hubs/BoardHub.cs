using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interface;

namespace RatATatCatBackEnd.Hubs
{
    public class BoardHub : Hub<IBoardHub>
    {
        public async Task RefreshPage()
        {
            await Clients.All.refreshBoards();
        }
    }
}
