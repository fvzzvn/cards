﻿namespace RatATatCatBackEnd.Models.GameModels
{
    public class Stack
    {
        public int stackSize { get; set; }
        public Stack<Card> cards { get; set; }
        public bool IsEmpty { get; set; }
        public Stack()
        {
            this.cards = new Stack<Card>();
            this.IsEmpty = true;
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
