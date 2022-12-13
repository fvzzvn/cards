namespace RatATatCatBackEnd.Models.GameModels
{
    public interface ICardDealer
    {
        void FillDeck();
        void Shuffle();
        void GiveHand(Player player);
        Card GiveCard(Player player);
        bool isEmpty();
    }
}
