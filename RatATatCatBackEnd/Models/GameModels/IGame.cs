namespace RatATatCatBackEnd.Models.GameModels
{
    public interface IGame
    {
        CardDealer Dealer { get; set; }
        string Id { get; set; }
        Player Player1 { get; set; }
        Player Player2 { get; set; }
        Player Player3 { get; set; }
        Player Player4 { get; set; }
        Player PlayerTurn { get; set; }
        Stack Stack { get; set; }
        int TurnsLeft { get; set; }

        void AddPlayer(Player player);
        void End();
        Card GetCardFromStack(Player player);
        bool IsFull();
        Player NextTurn();
        void PlayCard(Card card, Player player);
        void PlayCardAfterGet(Card card, Player player);
        string ToString();
    }
}