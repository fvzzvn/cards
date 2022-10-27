using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Models
{
    public class BoardToView
    {
        public BoardInstance Board { get; set; }
        public List<ParticipantToView> Participants { get; set; }
    }
}
