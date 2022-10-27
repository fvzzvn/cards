using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RatATatCatBackEnd.Controllers
{
    [Route("api/boards")]
    [ApiController]
    public class BoardsController : ControllerBase
    {
        private readonly IBoardInstance _IBoardInstance;
        private readonly IParticipant _IParticipant;
        public BoardsController(IBoardInstance IBoardInstance, IParticipant IParticipant)
        {
            _IBoardInstance = IBoardInstance;
            _IParticipant = IParticipant;
        }

        // GET: api/<Boards>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardToView>>> Get()
        {
            List<BoardToView> toView = new List<BoardToView>();
            var boards = await Task.FromResult(_IBoardInstance.GetBoards());

            if (boards.Count == 0)
            {
                return NotFound();
            }

            foreach (BoardInstance board in boards)
            {
                BoardToView nbw = new BoardToView();
                nbw.Board = board;
                nbw.Participants = _IParticipant.GetParticipantNamesByBoard(board.Id);
                toView.Add(nbw);
            }
            return Ok(toView);
        }

        // GET api/<Boards>/5.
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardInstance>> Get(int id)
        {
            var board = await Task.FromResult(_IBoardInstance.GetBoard(id));
            var participants = _IParticipant.GetParticipantNamesByBoard(id);
            var mmr = _IParticipant.GetBoardMmr(id);
            if (board == null)
            {
                return NotFound();
            }
            return Ok(new { board, participants, mmr});
        }

        // POST api/<Boards>
        [HttpPost]
        public async Task<ActionResult<BoardInstance>> Post(BoardInstance board)
        {
            _IBoardInstance.AddBoard(board);
            return await Task.FromResult(board);
        }

        // PUT api/<Boards>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BoardInstance>> Put(int id, BoardInstance board)
        {
            if (id != board.Id)
            {
                return BadRequest();
            }
            try
            {
                _IBoardInstance.UpdateBoard(board);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return await Task.FromResult(board);
        }

        private bool BoardExists(int id)
        {
            return _IBoardInstance.CheckBoard(id);
        }

        // DELETE api/<Boards>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BoardInstance>> Delete(int id)
        {
            _IParticipant.DeletePlayerFromBoard(id);
            var board = _IBoardInstance.RemoveBoard(id);
            return await Task.FromResult(board);
        }
    }
}
