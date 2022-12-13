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
        public Dictionary<Card, Card> Track { get; set; } = new Dictionary<Card, Card>();
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
            
        }

        public void ApplySpecialCardEffect(Card card, List<Player> players, List<Card> cards)
        {
            throw new NotImplementedException();
        }

        public void ApplySpecialCardEffect(Card card, Player player, int[] positions)
        {
            throw new NotImplementedException();
        }

        public void End()
        {
            throw new NotImplementedException();
        }

        public Card GiveCard(Player player, string from)
        {
            throw new NotImplementedException();
        }

        public bool IsFull()
        {
            throw new NotImplementedException();
        }

        public void NewRound()
        {
            throw new NotImplementedException();
        }

        public Player NextTurn()
        {
            throw new NotImplementedException();
        }

        public void PlayCard(Card card, Player player)
        {
            throw new NotImplementedException();
        }

        public void PlayCard(Card card, Player player, int position)
        {
            throw new NotImplementedException();
        }

        public void RemovePlayer(Player player)
        {
            throw new NotImplementedException();
        }

        public void RoundOver()
        {
            throw new NotImplementedException();
        }
        
        public void CreateTrack()
        {
            List<string> trackCards = new List<string> { "yellow", "purple", "green", "red", "blue" }
        }
    }
}
