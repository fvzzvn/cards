using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.APIModels;
using RatATatCatBackEnd.Models.Database;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RatATatCatBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantsController : ControllerBase
    {
        private readonly IParticipant _IParticipant;

        public ParticipantsController(IParticipant IPart)
        {
            _IParticipant = IPart;
        }

        // GET api/<Participants>/5
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> Get(int id)
        {
            var p = await Task.FromResult(_IParticipant.GetParticipant(id));
            if (p == null)
            {
                return NotFound();
            }
            return p;
        }
        // POST api/<Participants>
        [HttpPost]
        public async Task<ActionResult<Participant>> Post(ParticipantInput input)
        {
            Participant p = new Participant { UserId = input.UserId, BoardInstanceId = input.BoardId };
            _IParticipant.AddParticipant(p);
            return await Task.FromResult(p);
        }

        // DELETE api/<Participants>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Participant>> Delete(int id)
        {
            var participant = _IParticipant.GetParticipant(id);
            if(participant == null)
            {
                throw new Exception("Participant not found");
            }
            _IParticipant.DeleteParticipant(id);
            return await Task.FromResult(participant);
        }
    }
}
