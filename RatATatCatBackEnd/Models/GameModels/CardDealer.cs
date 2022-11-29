namespace RatATatCatBackEnd.Models.GameModels
{
    public class CardDealer : ICardDealer
    {
        public Stack<Card> Cards { get; set; }

        
        public CardDealer()
        {
            FillDeck();
        }

        public void FillDeck()
        {
            this.Cards = new Stack<Card>();

            List<string> suits = new List<string> { "clubs", "diamonds", "hearts", "spades" };
            List<string> types = new List<string> { "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace" };
            for (int i = 0; i < types.Count; i++)
            {
                for (int j = 0; j < suits.Count; j++)
                {
                    if (i < 8) { this.Cards.Push(new Card(types[i], suits[j], false)); }
                    else { this.Cards.Push(new Card(types[i], suits[j], true)); }
                }
            }
            Shuffle();

        }

        public void Shuffle()
        {
            Random rnd = new Random();

            var values = this.Cards.ToArray();
            this.Cards.Clear();
            foreach (var value in values.OrderBy(x => rnd.Next()))
                this.Cards.Push(value);
        }

        public void GiveHand(Player player)
        {
            for (int i = 0; i < 4; i++)
            {
                player.Cards.Add(this.Cards.Pop());
            }
        }

        public Card GiveCard(Player player)
        {
            Card card = this.Cards.Pop();
            player.Cards.Add(card);
            if (isEmpty()) { FillDeck(); }
            return card;
        }

        public bool isEmpty()
        {
            if (this.Cards.Count == 0)
            {
                return true;
            }
            return false;
        }
    }
}
