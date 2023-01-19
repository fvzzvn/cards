namespace RatATatCatBackEnd.Models.GameModels
{
    public class Stack
    {
        public int stackSize { get; set; } = 1;
        public Stack<Card> cards { get; set; }
        public bool IsEmpty { get; set; }
        public Stack()
        {
            this.cards = new Stack<Card>();
        }
        public bool NotEmpty()
        {
            if (cards.Count() > 0)
            {
                return true;
            }
            return false;
        }
        public Card PeekTop()
        {
            return this.cards.Peek();
        }

        public Card GetTop(Player player)
        {
            Card card = new Card();
            card = this.cards.Pop();
            player.Cards.Add(card);
            return card;
        }

        public void GetTopNTimes(Player player, int n)
        {
            try
            {
                for (int i = 0; i<n; i++)
                {
                    player.Cards.Add(cards.Pop());
                }
            }
            catch
            {
                throw;
            }
        }

        public void PlaceCard(Card card)
        {
            this.cards.Push(card);
        }

        public void Clear() => cards.Clear();
    }
}
