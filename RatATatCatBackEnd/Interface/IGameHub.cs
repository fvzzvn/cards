using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Interfaces
{
    public interface IGameHub
    {
        Task playerJoined(Player player);
        Task start(IGame game);
        Task playerPlayedCard(Player player, Card card, IGame game);
        Task playerTookCard(Player player, Card card, IGame game);
        Task stackEmpty();
        Task notPlayersTurn();
        Task gameEnding();
        Task receiveMessage(string username,string message);
    }
}
