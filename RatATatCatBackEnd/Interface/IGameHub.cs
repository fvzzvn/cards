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
        Task playerPlayedSpecialCard(Player player, Card card, IGame game);
        Task applySpecialCardEffect(Card card, Player player, IGame game, List<Player> players, List<Card> cards);
        Task notPlayersTurn();
        Task gameEnding();
        Task gameStatus(IGame game);
        Task receiveMessage(string username,string message);
        Task cantPlayCard();
    }
}
