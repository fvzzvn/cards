using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Interface
{
    public interface IParticipant
    {
        public Participant GetParticipant(int id);
        void AddParticipant(Participant p);
        public List<ParticipantToView> GetParticipantNamesByBoard(int id);
        public List<Participant> GetParticipantsForBoard(int boardId);
        public void DeletePlayerFromBoard(int id);
        public int GetBoardMmr(int id);
        public Participant DeleteParticipant(int id);
        public List<int> GetPlayersMmrByBoardId(int id);
        public Participant GetParticipantByUserName(string username);
    }
}
