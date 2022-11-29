namespace RatATatCatBackEnd.Models.GameModels
{
    public interface ICardDealer
    {
        Stack<Card> Cards { get; set; }
        void FillDeck();
        void Shuffle();
        void GiveHand(Player player);
        Card GiveCard(Player player);
        bool isEmpty();

    }
}
