using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Models
{
    public class BoardToView
    {
        public BoardInstance Board { get; set; }
        public Dictionary<int, string> Participants { get; set; }
        public List<int> PlayerMmrs { get; set; }
    }
}
