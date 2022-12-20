namespace RatATatCatBackEnd.Models.GameModels
{
    public class CrowGame : IGame
    {
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public ICardDealer Dealer { get; set; }
        public string Id { get; set; }
        public Stack Player1TravelStack { get; set; } = new Stack();
        public Stack Player1SpecialStack { get; set; } = new Stack();
        public Stack Player2TravelStack { get; set; } = new Stack();
        public Stack Player2SpecialStack { get; set; } = new Stack();
        public Dictionary<int, TrackCard> Track { get; set; } = new Dictionary<int, TrackCard>();
        public Player PlayerTurn { get; set; }
        public Stack Stack { get; set; }
        public bool RoundEnded { get; set; }
        public bool RoundEnding { get; set; }
        public Dictionary<Player, int> RoundResult { get; set; }
        public bool GameEnded { get; set; }
        public Dictionary<Player, int> GameResult { get; set; }
        public CrowGame(string id)
        {
            Id = id;
            Dealer = new CrowDealer();
            CreateTrack();
        } 
        public void AddPlayer(Player player)
        {
            if (Player1 is null)
            {
                Player1 = player;
            }
            else
            {
                Player2 = player;
            }
        }

        public void End()
        {
            GameEnded = true;
        }
        public void GiveCard(CrowCardRequest request)
        {
            if (Player1 == request.Player)
            {
                Player1SpecialStack.GetTopNTimes(request.Player, request.ActionCardQuanity);
                Player1TravelStack.GetTopNTimes(request.Player, request.FlyCardQuantity);
            }
            else if (Player2 == request.Player)
            {
                Player2SpecialStack.GetTopNTimes(request.Player, request.ActionCardQuanity);
                Player2TravelStack.GetTopNTimes(request.Player, request.ActionCardQuanity);
            }
        }
        public bool IsFull()
        {
            return Player1 is not null && Player2 is not null;
        }

        public void NewRound()
        {
            throw new NotImplementedException();
        }

        public Player NextTurn()
        {
            if (PlayerTurn == Player1) PlayerTurn = Player2;
            else PlayerTurn = Player1;
            return PlayerTurn;
        }

        public void PlayCard(Card card, Player player)
        {
            Card nextTile = getNextTrackCardForPlayer(player);
            if (card.Equals(nextTile))
            {
                player.PlayerPosition++;
            }

            if (player.PlayerPosition == Track.Count * 2)
                GameEnded = true;
        }

        public void PlayCard(Card card, Player player, int position)
        {
            throw new NotImplementedException();
        }

        public void RemovePlayer(Player player)
        {
            if (Player1 is not null)
                if (Player1 == player)
                    Player1 = null;
            else if (Player2 is not null)
                if (Player2 == player)
                    Player2 = null;
        }

        public void RoundOver()
        {
            throw new NotImplementedException();
        }
        
        public void CreateTrack()
        {
            Random rn = new Random();
            List<string> trackCards = new List<string> { "yellow", "purple", "green", "red", "blue" };

            for (int i = 0; i < 16; i++)
            {
                Card top = new Card { Text = trackCards[rn.Next(trackCards.Count)], IsSpecial = false};
                Card down = new Card { Text = trackCards[rn.Next(trackCards.Count)], IsSpecial = false };
                while (top.Equals(down))
                {
                    down = new Card { Text = trackCards[rn.Next(trackCards.Count)], IsSpecial = false };
                }
                Track[i] = new TrackCard(top, down);
                if (i > 0)
                {
                    if (Track[i - 1].Equals(Track[i])){
                        Track[i].SwitchTopDown();
                    }
                }
            }
        }
        private Card getNextTrackCardForPlayer(Player player)
        {
            if (player.PlayerPosition < 15)
            {
                if (Player1 == player)
                {
                    return Track[player.PlayerPosition + 1].Top;
                }
                return Track[player.PlayerPosition + 1].Down;
            }
            else
            {
                // player.PlayerPosition - calc to get other side;
                // position 16 is the end of line of cards
                // for 16 -> calc = 0 * 2 + 1 = 1 -> 16 - 1 = 15
                // for 17 -> calc = 1 * 2 + 1 = 3 -> 17 - 3 = 14
                int calc = (player.PlayerPosition % Track.Count()) * 2 + 1;

                if (Player1 == player)
                {
                    return Track[player.PlayerPosition - calc].Down;
                }
                return Track[player.PlayerPosition - calc].Top;
            }
        }
        public Card GiveCard(Player player, string from)
        {
            throw new NotImplementedException();
        }
        public void ApplySpecialCardEffect(Card card, List<Player> players, List<Card>? cards)
        {
            throw new NotImplementedException();
        }

        public void ApplySpecialCardEffect(Card card, Player player, int[]? positions)
        {
            Card moveYourselfForward = new Card { Text = "moveYourselfForward", IsSpecial = true };
            Card moveEnemyBackwards = new Card { Text = "moveEnemyBackwards", IsSpecial = true };

            Card switchTrackCards = new Card { Text = "switchRaceCards", IsSpecial = true };
            Card removeTrackCard = new Card { Text = "removeCard", IsSpecial = true };
            Card rotateTrackCard = new Card { Text = "rotateCard", IsSpecial = true };

            if (card.Equals(moveYourselfForward))
                player.PlayerPosition++;
            else if (card.Equals(moveEnemyBackwards))
            {
                if (Player1 == player)
                    Player2.PlayerPosition--;
                else if (Player2 == player)
                    Player1.PlayerPosition--;
            }

            else if (card.Equals(switchTrackCards))
            {
                var temp = Track[positions[0]];
                Track[positions[0]] = Track[positions[1]];
                Track[positions[1]] = temp;
            }
            else if (card.Equals(removeTrackCard))
            {
                Track.Remove(positions[0]);
                foreach (var item in Track.Where(kvp => kvp.Key > positions[0]).ToList())
                {
                    Track[item.Key - 1] = item.Value;
                }
            }
            else if (card.Equals(rotateTrackCard))
            {
                Track[positions[0]].SwitchTopDown();
            }
        }

    }
}
