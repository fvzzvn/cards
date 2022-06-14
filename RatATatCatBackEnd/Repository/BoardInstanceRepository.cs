using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Repository
{
    public class BoardInstanceRepository: IBoardInstance
    {
        readonly DatabaseContext _dbContext = new();

        public BoardInstanceRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddBoard(BoardInstance board)
        {
            try
            {
                _dbContext.BoardInstances.Add(board);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public bool CheckBoard(int id)
        {
            return _dbContext.BoardInstances.Any(u => u.Id == id);
        }

        public BoardInstance GetBoard(int id)
        {
            try
            {
                BoardInstance board = _dbContext.BoardInstances.Find(id);
                if (board != null)
                {
                    return board;
                }
                else
                {
                    throw new ArgumentNullException("No board found");
                }
            }
            catch
            {
                throw;
            }
        }

        public List<BoardInstance> GetBoards()
        {
            try
            {
                return _dbContext.BoardInstances.ToList();
            }
            catch
            {
                throw;
            }
        }

        public BoardInstance RemoveBoard(int id)
        {
            try
            {
                BoardInstance board = _dbContext.BoardInstances.Find(id);

                if (board != null)
                {
                    _dbContext.BoardInstances.Remove(board);
                    _dbContext.SaveChanges();
                    return board;
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

        public void UpdateBoard(BoardInstance board)
        {
            try
            {
                _dbContext.Entry(board).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}
