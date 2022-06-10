namespace RatATatCatBackEnd.Models
{
    public class Stack
    {
        public int stackSize = 0;

        public Stack<Card> cards;

        public Stack()
        {
            this.cards = new Stack<Card>();
        }
        public bool NotEmpty()
        {
            if (this.stackSize > 0)
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
            this.stackSize--;
            card = this.cards.Pop();
            player.Cards.Add(card);
            return card;
        }

        public void PlaceCard(Card card)
        {
            this.cards.Push(card);
            this.stackSize++;
        }
    }
}
