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

        public Card PeekTop()
        {
            return cards.Peek();
        }

        public Card GetTop()
        {
            return cards.Pop();
        }

        public void PlaceCard(Card card)
        {
            cards.Push(card);
        }
    }
}
