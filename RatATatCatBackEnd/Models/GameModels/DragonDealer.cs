namespace RatATatCatBackEnd.Models.GameModels
{
    public class DragonDealer : ICardDealer
    {
        public Stack<Card> Cards { get; set; }

        public DragonDealer()
        {
            FillDeck();
        }

        public void FillDeck()
        {
            this.Cards = new Stack<Card>();

            List<string> types = new List<string> { "-2", "0", "1", "2", "3", "4", "5", "6", "7", "8"};
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < types.Count(); j++)
                {
                    Cards.Push(new Card { Text = types[j], IsSpecial = false});
                }
            }
            types = new List<string> { "-1", "9", "10" };
            for (int i = 0; i<4; i++)
            {
                for (int j = 0; j < types.Count(); j++)
                {
                    Cards.Push(new Card { Text = types[j] , IsSpecial = true});
                }
            }
            Shuffle();
        }

        public Card GiveCard(Player player)
        {
            Card card = Cards.Pop();
            player.Cards.Add(card);
            if (isEmpty()) { FillDeck(); }
            return card;
        }

        public void GiveHand(Player player)
        {
            for (int i = 0; i<6; i++)
            {
                player.Cards.Add(Cards.Pop());
            }
        }

        public bool isEmpty()
        {
            if (this.Cards.Count == 0) return true;
            return false;
        }

        public void Shuffle()
        {
            Random rnd = new Random();

            var values = this.Cards.ToArray();
            this.Cards.Clear();
            foreach (var value in values.OrderBy(x => rnd.Next()))
                this.Cards.Push(value);
        }

        public Card StartingCard()
        {
            throw new NotImplementedException();
        }
    }
}
