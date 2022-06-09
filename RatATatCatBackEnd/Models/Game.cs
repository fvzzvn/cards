namespace RatATatCatBackEnd.Models
{
    public class Game
    {
        public Game(string id)
        {
            this.Id = id;
            this.Stack = new Stack();

        }
        public string Id { get; set; }
        public Stack Stack { get; set; }
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public Player Player3 { get; set; }
        public Player Player4 { get; set; }

        public void AddPlayer(Player player)
        {
            if(this.Player1 == null)
            {
                this.Player1 = player;
            }
            else if(this.Player2 == null)
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
            if (Stack.PeekTop() == card)
            {
                player.Cards.Remove(card);
                Stack.PlaceCard(card);
            }
            else
            {
                player.Cards.Add(Stack.GetTop());
            }
        }

        public override string ToString()
        {
            return String.Format("(Id={0}, Player1={1}, Player2={2}, Player3={3},Player4={4}, Stack={5})",
                this.Id, this.Player1, this.Player2, this.Player3, this.Player4, this.Stack);
        }
    }
}
