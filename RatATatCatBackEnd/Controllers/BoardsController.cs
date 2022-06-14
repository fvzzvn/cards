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

        public BoardsController(IBoardInstance IBoardInstance)
        {
            _IBoardInstance = IBoardInstance;
        }

        // GET: api/<Boards>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardInstance>>> Get()
        {
            return await Task.FromResult(_IBoardInstance.GetBoards());
        }

        // GET api/<Boards>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardInstance>> Get(int id)
        {
            var board = await Task.FromResult(_IBoardInstance.GetBoard(id));
            if (board == null)
            {
                return NotFound();
            }
            return board;
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
            var board = _IBoardInstance.RemoveBoard(id);
            return await Task.FromResult(board);
        }
    }
}
