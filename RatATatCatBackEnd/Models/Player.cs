namespace RatATatCatBackEnd.Models
{
    public class Player
    {
        public Player(string id, string name)
        {
            this.Id = id;
            this.Name = name;
            Card card = new Card() { Id = 1, Text = "2 tref", IsSpecial = 0 };
            this.Cards = new List<Card> { card };
        }
        public string Id { get; set; }
        public string Name { get; set; }

        public string GameId { get; set; }
        
        public List<Card> Cards { get; set; }

        public override string ToString()
        {
            return String.Format("(Id={0}, Name={1}, GameId={2}, Piece={3})",
                this.Id, this.Name, this.GameId, this.Cards);
        }
    }
}
