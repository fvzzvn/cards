using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Interfaces
{
    public interface IGameHub
    {
        Task playerJoined(Player player);
        Task start(Game game);
        Task playerPlayedCard(Player player, Card card, Game game);
        Task playerTookCard(Player player, Card card, Game game);
        Task stackEmpty();
        Task notPlayersTurn();
        Task gameEnding();
        Task RecieveMessage(string username,string message);
    }
}
