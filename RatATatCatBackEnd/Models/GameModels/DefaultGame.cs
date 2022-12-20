namespace RatATatCatBackEnd.Models.GameModels
{
    public class DefaultGame : IGame
    {
        public DefaultGame(string id)
        {
            this.Id = id;
            this.Stack = new Stack();
            this.Dealer = new CardDealer();
        }
        public string Id { get; set; }
        public Stack Stack { get; set; }
        public ICardDealer Dealer { get; set; }
        public Player PlayerTurn { get; set; }
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public Player Player3 { get; set; }
        public Player Player4 { get; set; }
        public int TurnsLeft { get; set; } = 4;
        public bool RoundEnding { get; set; }
        public bool RoundEnded { get; set; }
        public Dictionary<Player, int> RoundResult { get; set; }
        public bool GameEnded { get; set; }
        public Dictionary<Player, int> GameResult { get; set; }

        private bool AfterGet = false;
        private static Random rng = new Random();

        public void AddPlayer(Player player)
        {
            if (this.Player1 == null)
            {
                this.Player1 = player;
            }
            else if (this.Player2 == null)
            {
                this.Player2 = player;
            }

            else if (this.Player3 == null)
            {
                this.Player3 = player;
            }

            else if (this.Player4 == null)
            {
                this.Player4 = player;
            }
        }
        public void RemovePlayer(Player player)
        {
            if (Player1 is not null)
                if (Player1 == player)
                    Player1 = null;

            else if (Player2 is not null)
                if (Player2 == player)
                    Player2 = null;

            else if (Player3 is not null)
                if (Player3 == player)
                    Player3 = null;

            else if (Player4 is not null)
                if (Player4 == player)
                    Player4 = null;
        }
        public bool IsFull()
        {
            if (this.Player1 != null & this.Player2 != null & this.Player3 != null & this.Player4 != null)
            {
                return true;
            }
            return false;
        }

        public void PlayCard(Card card, Player player)
        {
            if (AfterGet)
            {
                player.Cards.Remove(card);
                Stack.PlaceCard(card);
                AfterGet = false;
            }
            else
            {
                if (Stack.IsEmpty)
                {
                    player.Cards.Remove(card);
                    Stack.PlaceCard(card);
                }
                else if (Stack.PeekTop().Equals(card))
                {
                    player.Cards.Remove(card);
                    Stack.PlaceCard(card);
                }
                else
                {
                    GetCardFromStack(player);
                }
            }
        }

        public void PlayCardAfterGet(Card card, Player player)
        {
            player.Cards.Remove(card);
            this.Stack.PlaceCard(card);
        }

        public Card GetCardFromStack(Player player)
        {
            Card card = Stack.GetTop(player);
            return card;
        }

        public Player NextTurn()
        {
            AfterGet = false;
            if (this.PlayerTurn == this.Player1)
            {
                this.PlayerTurn = this.Player2;
                return this.Player2;
            }
            else if (this.PlayerTurn == this.Player2)
            {
                this.PlayerTurn = this.Player3;
                return this.Player3;
            }
            else if (this.PlayerTurn == this.Player3)
            {
                this.PlayerTurn = this.Player4;
                return this.Player4;
            }
            else
            {
                this.PlayerTurn = this.Player1;
                return this.Player1;
            }
            if (RoundEnding) TurnsLeft--;
            if (TurnsLeft == 0) RoundEnded = true;
        }

        public void End()
        {
            GameEnded = true;
        }

        public override string ToString()
        {
            return String.Format("(Id={0}, Player1={1}, Player2={2}, Player3={3},Player4={4}, Stack={5})",
                this.Id, this.Player1, this.Player2, this.Player3, this.Player4, this.Stack);
        }

        public Card GiveCard(Player player, string from)
        {
            Card card = new Card();
            if (from == "dealer")
            {
                card = Dealer.GiveCard(player);
            }

            else if (from == "stack")
            {
                if (Stack.NotEmpty())
                {
                    card = GetCardFromStack(player);
                }
            }
            AfterGet = true;
            return card;
        }

        public void ShuffleCards(Player player)
        {
            int n = player.Cards.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                Card value = player.Cards[k];
                player.Cards[k] = player.Cards[n];
                player.Cards[n] = value;
            }
        }

        public void ApplySpecialCardEffect(Card card, List<Player> players, List<Card> cards)
        {
            Card Jack = new Card { Text = "Jack" };
            Card Ace = new Card { Text = "Ace" };
            if (card.Equals(Jack))
            {
                if (players.Count > 2 && cards.Count == 2)
                {
                    players[0].Cards.Remove(cards[0]);
                    players[0].Cards.Add(cards[1]);
                    players[1].Cards.Remove(cards[1]);
                    players[1].Cards.Add(cards[0]);
                }
            }
            //maybe more ?
            //if (card.Equals(Ace)) 
            //{
            //    // randomly select one player and shuffle his cards
            //    int r = rng.Next(1, 5);
            //    if (r == 1)
            //    {
            //        ShuffleCards(Player1);
            //    }
            //    if (r == 2)
            //    {
            //        ShuffleCards(Player2);
            //    }
            //    if (r == 3)
            //    {
            //        ShuffleCards(Player3);
            //    }
            //    if (r == 4)
            //    {
            //        ShuffleCards(Player4);
            //    }
            //}
        }
        public void RoundOver()
        {
            CalculatePoints();
            // Check for winner
            foreach (KeyValuePair<Player, int> entry in GameResult)
            {
                if (entry.Value >= 100) End();
            }
        }
        public void NewRound()
        {
            RoundEnded = false;
            Dealer.FillDeck();
            Stack.Clear();
            RoundResult.Clear();

            Player1.Cards.Clear();
            Player2.Cards.Clear();
            Player3.Cards.Clear();
            Player4.Cards.Clear();

            Dealer.GiveHand(Player1);
            Dealer.GiveHand(Player2);
            Dealer.GiveHand(Player3);
            Dealer.GiveHand(Player4);
        }
        public void CalculatePoints()
        {
            // Player1
            int firstPlayerPoints = 0;
            int secondPlayerPoints = 0;
            int thirdPlayerPoints = 0;
            int forthPlayerPoints = 0;

            foreach (Card card in Player1.Cards)
            {
                firstPlayerPoints += Int16.Parse(card.Text);
            }
            foreach (Card card in Player2.Cards)
            {
                secondPlayerPoints += Int16.Parse(card.Text);
            }
            foreach (Card card in Player3.Cards)
            {
                thirdPlayerPoints += Int16.Parse(card.Text);
            }
            foreach (Card card in Player4.Cards)
            {
                forthPlayerPoints += Int16.Parse(card.Text);
            }
            RoundResult[Player1] = firstPlayerPoints;
            RoundResult[Player2] = secondPlayerPoints;
            RoundResult[Player3] = thirdPlayerPoints;
            RoundResult[Player4] = forthPlayerPoints;
            // save game results
            foreach (KeyValuePair<Player, int> entry in RoundResult)
            {
                GameResult[entry.Key] += entry.Value;
            }
        }
        public void PlayCard(Card card, Player player, int position)
        {
            throw new NotImplementedException();
        }

        public void ApplySpecialCardEffect(Card card, Player player, int[] positions)
        {
            throw new NotImplementedException();
        }

        public void GiveCard(CrowCardRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
