namespace RatATatCatBackEnd.Models.GameModels
{
    public class CardDealer
    {
        public Stack<Card> cards;

        public CardDealer()
        {
            FillDeck();
        }

        private void FillDeck()
        {
            this.cards = new Stack<Card>();

            List<string> suits = new List<string> { "clubs", "diamonds", "hearts", "spades" };
            List<string> types = new List<string> { "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace" };
            for (int i = 0; i < types.Count; i++)
            {
                for (int j = 0; j < suits.Count; j++)
                {
                    if (i < 8) { this.cards.Push(new Card(types[i], suits[j], false)); }
                    else { this.cards.Push(new Card(types[i], suits[j], true)); }
                }
            }
            Shuffle();

        }

        public void Shuffle()
        {
            Random rnd = new Random();

            var values = this.cards.ToArray();
            this.cards.Clear();
            foreach (var value in values.OrderBy(x => rnd.Next()))
                this.cards.Push(value);
        }

        public void GiveHand(Player player)
        {
            for (int i = 0; i < 4; i++)
            {
                player.Cards.Add(this.cards.Pop());
            }
        }

        public Card GiveCard(Player player)
        {
            Card card = this.cards.Pop();
            player.Cards.Add(card);
            if (isEmpty()) { FillDeck(); }
            return card;
        }

        public bool isEmpty()
        {
            if (this.cards.Count == 0)
            {
                return true;
            }
            return false;
        }
    }
}
