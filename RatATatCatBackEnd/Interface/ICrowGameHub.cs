using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Interface
{
    public interface ICrowGameHub
    {
        Task playerJoined(Player player);
        Task start(IGame game);
        Task playerPlayedCard(Player player, Card card, IGame game);
        Task playerPlayedSpecialCard(Player player, Card card, IGame game);
        Task applySpecialCardEffect(Card card, Player players, IGame cards);
        Task notPlayersTurn();
        Task nextTurn(IGame game);
        Task gameResults(Dictionary<Player, int> gameResults);
        Task receiveMessage(string username, string message);
    }
}