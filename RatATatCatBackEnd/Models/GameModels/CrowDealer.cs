namespace RatATatCatBackEnd.Models.GameModels
{
    public class CrowDealer : ICardDealer
    {
        public Stack<Card> Player1FlyCards { get; set; }
        public Stack<Card> Player1ActionCards { get; set; }
        public Stack<Card> Player2FlyCards { get; set; }
        public Stack<Card> Player2ActionCards { get; set; }
        public void FillDeck()
        {
            List<string> flyCards = new List<string> { "yellow", "purple", "green", "red", "blue" };
            List<string> actionCards = new List<string> { "switchRaceCards", "moveYourselfForward", "moveEnemyBackwards", "rotateCard", "removeCard" };

            // FlyCards
            for (int i = 0; i < flyCards.Count(); i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    Player1FlyCards.Push(new Card { Text = flyCards[i], IsSpecial = false });
                    Player2FlyCards.Push(new Card { Text = flyCards[i], IsSpecial = false });
                }
            }
            for (int i = 0; i < actionCards.Count(); i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    Player1FlyCards.Push(new Card { Text = actionCards[i], IsSpecial = true });
                    Player2FlyCards.Push(new Card { Text = actionCards[i], IsSpecial = true });
                }
            }
            Shuffle();
        }
        public Card GiveCard(Player player)
        {
            throw new NotImplementedException();
        }

        public void GiveHand(Player player)
        {
            throw new NotImplementedException();
        }

        public bool isEmpty()
        {
            throw new NotImplementedException();
        }

        public void Shuffle()
        {
            ShuffleCards(Player1FlyCards);
            ShuffleCards(Player1ActionCards);
            ShuffleCards(Player2FlyCards);
            ShuffleCards(Player2ActionCards);
        }
        public void ShuffleCards(Stack<Card> Cards)
        {
            Random rnd = new Random();
            var values = Cards.ToArray();
            Cards.Clear();
            foreach (var value in values.OrderBy(x => rnd.Next()))
                Cards.Push(value);
        }

        public Card StartingCard()
        {
            throw new NotImplementedException();
        }
    }
}
