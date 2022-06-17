namespace RatATatCatBackEnd.Models.GameModels
{
    public class Card
    {
        public string Text { get; set; }
        public string Suit { get; set; }
        public bool IsSpecial { get; set; }

        public Card(string text, string suit, bool special)
        {
            this.Text = text;
            this.Suit = suit;
            this.IsSpecial = special;
        }
        public Card() { }

        public override bool Equals(object obj)
        {
            Card other = obj as Card;

            if (other == null) return false;

            return this.Text.Equals(other.Text);
        }

        public override int GetHashCode()
        {
            return this.Text.GetHashCode();
        }
    }
}
