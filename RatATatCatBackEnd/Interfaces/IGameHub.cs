using RatATatCatBackEnd.Models;

namespace RatATatCatBackEnd.Interfaces
{
    public interface IGameHub
    {
        public void playerJoined(Player player);
        public void start(Game game);
    }
}
