using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.APIModels;
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
                return Ok(toView);
            }

            foreach (BoardInstance board in boards)
            {
                BoardToView nbw = new BoardToView();
                nbw.BoardId = board.Id;
                nbw.BoardName = board.BoardName;
                nbw.BoardMode = board.BoardMode;
                nbw.BoardType = board.BoardType;
                var Participants = _IParticipant.GetParticipantNamesByBoard(board.Id);
                foreach (var p in Participants)
                {
                    nbw.Players.Add(p.Name,p.Mmr);
                }
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
            BoardToView toView = new BoardToView();
            toView.BoardId = board.Id;
            toView.BoardName = board.BoardName;
            toView.BoardType = board.BoardType;
            toView.BoardMode = board.BoardMode;

            foreach (var p in participants)
            {
                toView.Players.Add(p.Name, p.Mmr);
            }
            return Ok(toView);
        }

        // POST api/<Boards>
        [HttpPost]
        public async Task<ActionResult<BoardInstance>> Post(BoardInput input)
        {
            BoardInstance board = new BoardInstance { BoardName = input.BoardName ,BoardMode = input.BoardMode, BoardType = input.BoardType };
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
