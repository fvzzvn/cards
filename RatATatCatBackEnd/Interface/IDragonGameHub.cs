using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Interface
{
    public interface IDragonGameHub
    {
        Task playerJoined(Player player);
        Task start(IGame game);
        Task notPlayersTurn();
        Task playerPlayedSpecialCard(Player player, Card card, IGame game);
        Task roundResults(Dictionary<string, int> roundResults);
        Task newRound(IGame game);
        Task gameResults(Dictionary<string, int> gameResults);
        Task applySpecialCardEffect(Card card, Player player, IGame game);
        Task playerTookCard(Player player, Card card, IGame game, string from);
        Task nextTurn(IGame game);
    }
}