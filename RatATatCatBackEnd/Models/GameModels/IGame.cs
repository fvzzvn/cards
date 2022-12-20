namespace RatATatCatBackEnd.Models.GameModels
{
    public interface IGame
    {
        Player Player1 { get; set; }
        Player Player2 { get; set; }
        ICardDealer Dealer { get; set; }
        string Id { get; set; }
        Player PlayerTurn { get; set; }
        Stack Stack { get; set; }
        bool RoundEnded { get; set; }
        bool RoundEnding { get; set; }
        Dictionary<Player, int> RoundResult { get; set; }
        bool GameEnded { get; set; }
        Dictionary<Player, int> GameResult { get; set; }

        void AddPlayer(Player player);
        void RemovePlayer(Player player);
        void End();
        void NewRound();
        void RoundOver();
        bool IsFull();
        Player NextTurn();
        Card GiveCard(Player player, string from);
        void GiveCard(CrowCardRequest request);
        void PlayCard(Card card, Player player);
        void PlayCard(Card card, Player player, int position);
        void ApplySpecialCardEffect(Card card, List<Player> players, List<Card>? cards);
        void ApplySpecialCardEffect(Card card, Player player, int[]? positions);
        string ToString();
    }
}