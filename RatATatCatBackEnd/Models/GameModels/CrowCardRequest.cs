namespace RatATatCatBackEnd.Models.GameModels
{
    public class CrowCardRequest
    {
        public Player Player { get; set; }
        public int FlyCardQuantity { get; set; }
        public int ActionCardQuanity { get; set; }
        public CrowCardRequest(Player player, int flyCardQuantity, int actionCardQuanity)
        {
            Player = player;
            FlyCardQuantity = flyCardQuantity;
            ActionCardQuanity = actionCardQuanity;
        }
    }
}
