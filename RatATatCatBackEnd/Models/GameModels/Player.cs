namespace RatATatCatBackEnd.Models.GameModels
{
    public class Player
    {
        public Player(string id, string name, string gameId)
        {
            this.Id = id;
            this.Name = name;
            this.GameId = gameId;
            this.Cards = new List<Card>();
        }
        public string Id { get; set; }
        public int PlayerPosition { get; set; } = -1;
        public string Name { get; set; }
        public string GameId { get; set; }
        public List<Card> Cards { get; set; }

        // dragon mode, too lazy for interafce
        public bool AllCardsFacedUp()
        {
            bool flag = true;
            foreach (Card card in Cards)
            {
                if (card.FacedDown) flag = false;
            }
            return flag;
        }
        public override string ToString()
        {
            return String.Format("(Id={0}, Name={1}, GameId={2}, Piece={3})",
                this.Id, this.Name, this.GameId, this.Cards);
        }

        public override bool Equals(object obj)
        {
            Player other = obj as Player;

            if (other == null)
            {
                return false;
            }

            return this.Name.Equals(other.Name) && this.Id.Equals(other.Id);
        }

        public override int GetHashCode()
        {
            return this.Name.GetHashCode() * this.Id.GetHashCode();
        }
    }
}
