namespace RatATatCatBackEnd.Models.GameModels
{
    public class TrackCard
    {
        public Card Top { get; set; }
        public Card Down { get; set; }
        public TrackCard(Card top, Card down)
        {
            Top = top;
            Down = down;
        }

        public void SwitchTopDown()
        {
            var temp = Top;
            Top = Down;
            Down = temp;
        }

        public override bool Equals(object? obj)
        {
            TrackCard other = obj as TrackCard;

            if (other is null)
                return false;

            return this.Top.Equals(other.Top) && this.Down.Equals(other.Down);
        }
    }
}
