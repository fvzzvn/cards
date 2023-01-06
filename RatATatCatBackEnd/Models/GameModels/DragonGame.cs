namespace RatATatCatBackEnd.Models.GameModels
{
    public class DragonGame : IGame
    {
        public string Id { get; set; }
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public ICardDealer Dealer { get; set; }
        public Player PlayerTurn { get; set; }
        public Stack Stack { get; set; }
        public Stack Stack2 { get; set; }
        public int Player1TokenCount { get; set; }
        public int Player2TokenCount { get; set; }

        public DragonGame(string id)
        {
            Id = id;
            Dealer = new DragonDealer();
            Stack = new Stack();
            Stack2 = new Stack();
        }
        public void AddPlayer(Player player)
        {
            if (Player1 == null) Player1 = player;
            else Player2 = player;
        }

        public void End()
        {
            throw new NotImplementedException();
        }

        public Card GiveCard(Player player, string from)
        {
            Card card = new Card();
            if (from == "dealer")
            {
                card = Dealer.GiveCard(player);
            }
            else if (from == "stack1")
            {
                card = GetCardFromStack(Stack, player);
            }
            else if (from == "stack2")
            {
                card = GetCardFromStack(Stack2, player);
            }
            return card;
        }

        public bool IsFull()
        {
            if (Player1 != null && Player2 != null) return true;
            return false;
        }
        public bool IsEmpty()
        {
            if (Player1 == null && Player2 == null)
                return true;
            return false;
        }
        public Player NextTurn()
        {
            if (PlayerTurn == Player1)
            {
                PlayerTurn = Player2;
                return Player2;
            }
            else
            {
                PlayerTurn = Player1;
                return Player1;
            }
        }

        public void RemovePlayer(Player player)
        {
            if (Player1.Equals(player))
            {
                Player1 = null;
            }
            else
            {
                Player2 = null;
            }
        }

        public Card GetCardFromStack(Stack stack, Player player)
        {
            return stack.GetTop(player);
        }

        public void PlayCard(Card card, Player player, int position)
        {
            player.Cards[position] = card;
        }
        public void ApplySpecialCardEffect(Card card, Player player, int[] positions)
        {
            Card crowsNest = new Card { Text = "9" };
            Card crowCircle = new Card { Text = "10" };
            
            if (card.Equals(crowCircle))
            {
                Card tempCard = player.Cards[positions[0]];
                player.Cards[positions[0]] = card;
                if (player.Equals(Player1))
                {
                    Player2.Cards[positions[0]] = tempCard;
                }
                else
                {
                    Player1.Cards[positions[0]] = tempCard;
                }
            }
            if (card.Equals(crowsNest))
            {
                Card tempCard;
                player.Cards[positions[0]] = crowCircle;
                tempCard = player.Cards[positions[1]];
                player.Cards[positions[1]] = player.Cards[positions[2]];
                player.Cards[positions[2]] = tempCard;
            }
        }
        public void PlayCard(Card card, Player player)
        {
            throw new NotImplementedException();
        }

        public void ApplySpecialCardEffect(Card card, List<Player> players, List<Card> cards)
        {
            throw new NotImplementedException();
        }

    }
}
