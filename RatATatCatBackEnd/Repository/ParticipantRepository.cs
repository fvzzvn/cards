using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Repository
{
    public class ParticipantRepository
    {
        readonly DatabaseContext _dbContext = new();

        public ParticipantRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
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
    }
}
