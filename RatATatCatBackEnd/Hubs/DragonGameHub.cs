using Microsoft.AspNetCore.SignalR;
using RatATatCatBackEnd.Interface;

namespace RatATatCatBackEnd.Hubs
{
    public class DragonGameHub : Hub<IDragonGameHub>
    {
        private readonly IGameState _gameState;
        private readonly IServiceProvider _serviceProvider;
        private readonly IParticipant _participants;
    }
}
