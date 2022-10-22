using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Interface
{
    public interface IParticipant
    {
        public Participant GetParticipant(int id);
        void AddParticipant(Participant p);
        public Dictionary<int, string> GetParticipantNamesByBoard(int id);
        public void DeletePlayerFromBoard(int id);
        public int GetBoardMmr(int id);
        public Participant DeleteParticipant(int id);
        public List<int> GetPlayersMmrByBoardId(int id);
    }
}
