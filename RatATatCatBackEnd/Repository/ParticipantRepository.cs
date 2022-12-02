using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Repository
{
    public class ParticipantRepository : IParticipant
    {
        readonly DatabaseContext _dbContext = new();
        readonly IUserInfo _IUserInfo;

        public ParticipantRepository(DatabaseContext dbContext, IUserInfo userInfo)
        {
            _dbContext = dbContext;
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

        public Participant GetParticipantByUserName(string username)
        {
            try
            {
                UserInfo user = _IUserInfo.GetUserInfoByUserName(username);
                Participant p = _dbContext.Participants.Where(p => p.UserId == user.UserId).First();

                return p;
            }
            catch
            {
                throw;
            }
        }

        public void AddParticipantByUserName(string username, int boardId)
        {
            try
            {
                UserInfo user = _IUserInfo.GetUserInfoByUserName(username);
                Participant p = new Participant
                {
                    UserId = user.UserId,
                    BoardInstanceId = boardId
                };

                _dbContext.Participants.Add(p);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public List<ParticipantToView> GetParticipantNamesByBoard(int id)
        {
            List<Participant> participants;
            List<ParticipantToView> participantToViews = new List<ParticipantToView>();

            participants = _dbContext.Participants.Where(p => p.BoardInstanceId == id)
                .ToList();
            
            foreach (Participant p in participants)
            {
                UserInfo u = _IUserInfo.GetUserInfo(p.UserId);
                ParticipantToView pw = new ParticipantToView { Mmr = u.Mmr, Name = u.DisplayName };
                participantToViews.Add(pw);
            }

            return participantToViews;
        }
        public List<int> GetPlayersMmrByBoardId(int id)
        {

            List<Participant> participants;
            List<int> mmrs = new List<int>();

            participants = _dbContext.Participants.Where(p => p.BoardInstanceId == id).ToList();
            foreach (Participant p in participants)
            {
                mmrs.Add(_IUserInfo.GetUserInfo(p.UserId).Mmr);
            }
            return mmrs;
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
            if (participants.Count > 0)
            {
                avg = avg / participants.Count;
            }

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

        public List<Participant> GetParticipantsForBoard(int boardId)
        {
            try
            {
                List<Participant> participants = _dbContext.Participants.Where(u => u.BoardInstanceId == boardId).ToList();
                return participants;
            }
            catch
            {
                throw;
            }
        }
    }
}
