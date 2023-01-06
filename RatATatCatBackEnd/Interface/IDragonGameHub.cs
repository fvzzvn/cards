using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Interface
{
    public interface IDragonGameHub
    {
        Task playerJoined(Player player);
        Task start(IGame game);
        Task notPlayersTurn();
        Task playerPlayedSpecialCard(Player player, Card card, IGame game);
        Task roundResults(Dictionary<Player, int> roundResults);
        Task newRound(IGame game);
        Task gameResults(Dictionary<Player, int> gameResults);
        Task applySpecialCardEffect(Card card, Player player, IGame game);
        Task playerTookCard(Player player, Card card, IGame game);
        Task nextTurn(IGame game);
    }
}