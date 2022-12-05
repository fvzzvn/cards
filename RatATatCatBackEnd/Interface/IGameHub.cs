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
        Task applySpecialCardEffect(Card card, Player players, IGame cards);
        Task notPlayersTurn();
        Task GameEnded(Player player);
        Task newRound(IGame game);
        Task roundResults(Dictionary<Player, int> roundResults);
        Task gameResults(Dictionary<Player, int> gameResults);
        Task receiveMessage(string username,string message);
    }
}
