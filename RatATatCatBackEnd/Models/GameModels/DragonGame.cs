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
        public bool RoundEnded { get; set; } = false;
        public bool GameEnded { get; set; } = false;
        public Dictionary<string,int> RoundResult { get; set; }
        public Dictionary<string, int> GameResult { get; set; }
        public bool RoundEnding { get; set; }
        public Player Player3 { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Player Player4 { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public DragonGame(string id)
        {
            Id = id;
            Dealer = new DragonDealer();
            Stack = new Stack();
            Stack2 = new Stack();
            RoundResult = new Dictionary<string, int>();
            GameResult = new Dictionary<string, int>();
        }
        public void AddPlayer(Player player)
        {
            if (Player1 == null) Player1 = player;
            else Player2 = player;
            GameResult[player.Name] = 0;
        }

        public void End()
        {
            GameEnded = true;
            GameResult[Player1.Name] = Player1TokenCount;
            GameResult[Player2.Name] = Player2TokenCount;
        }

        public Card GiveCard(Player player, string from)
        {
            Card card = new Card { };
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
            if (Player1 is not null && Player1.Equals(player))
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
            switch (position)
            {
                case 6:
                    Stack.PlaceCard(card);
                    break;
                case 7:
                    Stack2.PlaceCard(card);
                    break;
                default:
                    player.Cards[position] = card;
                    break;
            }
            if (player.AllCardsFacedUp()) RoundEnded = true;
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
        public void CalculatePoints()
        {
            int firstPlayerPoints = 0;
            int secondPlayerPoints = 0;

            Card crowMirror = new Card { Text = "-1" };
            // szukamy odbicia u obu graczy

            //Player1
            for (int i=0; i<6; i++)
            {
                if (Player1.Cards[i].Equals(crowMirror))
                {
                    // szukamy mniejszej karty
                    if (i == 0 || i == 3)
                    {
                        Player1.Cards[i] = Player1.Cards[i + 1];
                    }
                    else if (i == 2 || i == 5)
                    {
                        Player1.Cards[i] = Player1.Cards[i - 1];
                    }
                    else
                    {
                        Card tempCard = Player1.Cards[i - 1];
                        if (Int16.Parse(tempCard.Text) > Int16.Parse(Player1.Cards[i + 1].Text)) tempCard = Player1.Cards[i + 1];
                        Player1.Cards[i] = tempCard;
                    }
                }
            }

            // Player2
            for (int i = 0; i < 6; i++)
            {
                if (Player2.Cards[i].Equals(crowMirror))
                {
                    // szukamy mniejszej karty
                    if (i == 0 || i == 3)
                    {
                        Player2.Cards[i] = Player2.Cards[i + 1];
                    }
                    else if (i == 2 || i == 5)
                    {
                        Player2.Cards[i] = Player2.Cards[i - 1];
                    }
                    else
                    {
                        Card tempCard = Player2.Cards[i - 1];
                        if (Int16.Parse(tempCard.Text) > Int16.Parse(Player2.Cards[i + 1].Text)) tempCard = Player2.Cards[i + 1];
                        Player2.Cards[i] = tempCard;
                    }
                }
            }

            Card cardZero = new Card { Text = "0" };
            // sprawdzamy odbicia góra dół, jeśli jest zamieniamy karty na 0
            // Player1
            for(int i = 0; i<3; i++)
            {
                if (Player1.Cards[i].Equals(Player1.Cards[i + 3]))
                {
                    Player1.Cards[i] = cardZero;
                    Player1.Cards[i + 3] = cardZero;
                }
            }
            //Player2
            for (int i = 0; i < 3; i++)
            {
                if (Player2.Cards[i].Equals(Player2.Cards[i + 3]))
                {
                    Player2.Cards[i] = cardZero;
                    Player2.Cards[i + 3] = cardZero;
                }
            }

            // Calculate Points
            // Player1
            for (int i = 0; i < 6; i++)
            {
                firstPlayerPoints += Int16.Parse(Player1.Cards[i].Text);
            }
            // Player2
            for (int i = 0; i < 6; i++)
            {
                secondPlayerPoints += Int16.Parse(Player2.Cards[i].Text);
            }
            // Kto wygrał
            RoundResult[Player1.Name] = firstPlayerPoints;
            RoundResult[Player2.Name] = secondPlayerPoints;
            if (firstPlayerPoints > secondPlayerPoints) Player1TokenCount++;
            else Player2TokenCount++;

        }
        public void RoundOver()
        {
            CalculatePoints();
            if (Player1TokenCount == 3) End();
            else if (Player2TokenCount == 3) End();
        }
        public void NewRound()
        {
            RoundEnded = false;
            Dealer.FillDeck();
            Stack.Clear();
            Stack2.Clear();
            RoundResult.Clear();

            Player1.Cards.Clear();
            Player2.Cards.Clear();

            Dealer.GiveHand(Player1);
            Dealer.GiveHand(Player2);
        }
        public void PlayCard(Card card, Player player)
        {
            throw new NotImplementedException();
        }

        public void ApplySpecialCardEffect(Card card, List<Player> players, List<Card> cards)
        {
            throw new NotImplementedException();
        }

        public void GiveCard(CrowCardRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
