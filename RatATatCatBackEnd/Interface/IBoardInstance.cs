using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Interface
{
    public interface IBoardInstance
    {
        public List<BoardInstance> GetBoards();
        public BoardInstance GetBoard(int id);
        public void AddBoard(BoardInstance board);
        public BoardInstance RemoveBoard(int id);
        public void UpdateBoard(BoardInstance board);
        public bool CheckBoard(int id);
    }
}
