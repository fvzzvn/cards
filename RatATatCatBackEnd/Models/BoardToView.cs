using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Models
{
    public class BoardToView
    {
        public int BoardId { get; set; }
        public string BoardName { get; set; }
        public int BoardType { get; set; }
        public int BoardMode { get; set; }
        public Dictionary<string, int> Players { get; set; } = new Dictionary<string, int>();
    }
}
