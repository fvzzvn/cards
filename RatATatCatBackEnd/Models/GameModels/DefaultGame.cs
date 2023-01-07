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
        public int TurnsLeft { get; set; }

        private bool AfterGet = false;
        private static Random rng = new Random();

        public void AddPlayer(Player player)
        {
            if (this.Player1 == null)
            {
                this.Player1 = player;
                player.OnBoardPosition = 1;
            }
            else if (this.Player2 == null)
            {
                this.Player2 = player;
                player.OnBoardPosition = 2;
            }

            else if (this.Player3 == null)
            {
                this.Player3 = player;
                player.OnBoardPosition = 3;
            }

            else if (this.Player4 == null)
            {
                this.Player4 = player;
                player.OnBoardPosition = 4;
            }
        }
        public void RemovePlayer(Player player)
        {
            if (this.Player1.Equals(player))
            {
                this.Player1 = null;
            }
            else if (this.Player2.Equals(player))
            {
                this.Player2 = null;
            }

            else if (this.Player3.Equals(player))
            {
                this.Player3 = null;
            }

            else if (this.Player4.Equals(player))
            {
                this.Player4 = null;
            }
        }
        public bool IsFull()
        {
            if (this.Player1 != null & this.Player2 != null & this.Player3 != null & this.Player4 != null)
            {
                return true;
            }
            return false;
        }
        public bool IsEmpty()
        {
            if (this.Player1 == null & this.Player2 == null & this.Player3 == null & this.Player4 == null)
                return true;
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
                if (Stack.IsEmpty && PlayerTurn.Equals(player))
                {
                    player.Cards.Remove(card);
                    Stack.PlaceCard(card);
                }
                else if (!Stack.IsEmpty)
                {
                    if (Stack.PeekTop().Equals(card))
                    {
                        player.Cards.Remove(card);
                        Stack.PlaceCard(card);
                    }
                }
                else if (Stack.IsEmpty)
                { }
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
        }

        public void End()
        {
            this.TurnsLeft = 4;
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
                int i = players[0].Cards.IndexOf(cards[0]);
                players[0].Cards[i] = cards[1];
                players[1].Cards[i] = cards[0];
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

        public void PlayCard(Card card, Player player, int position)
        {
            throw new NotImplementedException();
        }

        public void ApplySpecialCardEffect(Card card, Player player, int[] positions)
        {
            throw new NotImplementedException();
        }
    }
}
