using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;

namespace RatATatCatBackEnd.Controllers
{
    
    [Route("api/authentication")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserInfo _IUserInfo;

        public UsersController(IUserInfo IUserInfo)
        {
            _IUserInfo = IUserInfo;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserInfo>>> Get()
        {
            return await Task.FromResult(_IUserInfo.GetUsers());
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfo>> Get(int id)
        {
            var user = await Task.FromResult(_IUserInfo.GetUserInfo(id));
            if (user == null){
                return NotFound();
            }
            return user;
        }
        
        [HttpPost]
        public async Task<ActionResult<UserInfo>> Post(UserInfo user)
        {
            user.CreatedDate = DateTime.Now;
            user.Role = "Player";
            _IUserInfo.AddUser(user);
            return await Task.FromResult(user);
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserInfo>> Put(int id, UserInfo user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }
            try
            {
                _IUserInfo.UpdateUser(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return await Task.FromResult(user);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserInfo>> Delete(int id)
        {
            var user = _IUserInfo.DeleteUser(id);
            return await Task.FromResult(user);
        }

        private bool UserExists(int id)
        {
            return _IUserInfo.CheckUser(id);
        }
    }
}
