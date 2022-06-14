using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Repository
{
    public class ParticipantRepository : IParticipant
    {
        readonly DatabaseContext _dbContext = new();
        readonly IUserInfo _IUserInfo;
        readonly IBoardInstance _IBoardsInstance;

        public ParticipantRepository(DatabaseContext dbContext, IUserInfo userInfo, IBoardInstance iboard)
        {
            _dbContext = dbContext;
            _IBoardsInstance = iboard;
            _IUserInfo = userInfo;
        }

        public void AddParticipant(Participant p)
        {
            try
            {
                _dbContext.Participants.Add(p);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public Participant GetParticipant(int id)
        {
            Participant p = _dbContext.Participants.Find(id);
            if (p != null)
            {
                return p;
            }
            else
            {
                throw new ArgumentNullException("No user found");
            }
        }

        public List<string> GetParticipantNamesByBoard(int id)
        {
            List<Participant> participants;
            List<string> names = new List<string>();

            participants = _dbContext.Participants.Where(p => p.BoardInstanceId == id)
                .ToList();
            
            foreach (Participant p in participants)
            {
                names.Add(_IUserInfo.GetUserInfo(p.UserId).DisplayName);
            }

            return names;
        }

        public int GetBoardMmr(int id)
        {
            List<Participant> participants;
            int avg = 0;
            
            participants = _dbContext.Participants.Where(p => p.BoardInstanceId == id)
                .ToList();

            foreach (Participant p in participants)
            {
                avg = avg + _IUserInfo.GetUserInfo(p.UserId).Mmr;
            }
            avg = avg / participants.Count;

            return avg;
        }

        public void DeletePlayerFromBoard(int id)
        {
            var participants = _dbContext.Participants.Where(p => p.BoardInstanceId == id);

            foreach (Participant p in participants)
            {
                _dbContext.Remove(p);
            }
            _dbContext.SaveChanges();
        }

        public Participant DeleteParticipant(int id)
        {
            try
            {
                Participant participant = _dbContext.Participants.Find(id);

                if (participant != null)
                {
                    _dbContext.Participants.Remove(participant);
                    _dbContext.SaveChanges();
                    return participant;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch
            {
                throw;
            }
        }
    }
}
