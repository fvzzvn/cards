using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;
using System.Net;

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

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserInfo>> Get()
        {
            int uId = Int32.Parse(User.FindFirst("UserId").Value);
            var user = await Task.FromResult(_IUserInfo.GetUserInfo(uId));
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<UserInfo>> Post(UserInfo user)
        {
            user.CreatedDate = DateTime.Now;
            user.Role = "Player";
            user.Mmr = 500;
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
            int uId = Int32.Parse(User.FindFirst("UserId").Value);
            if (uId != id)
            {
                return BadRequest();
            }
            var user = _IUserInfo.DeleteUser(id);
            return await Task.FromResult(user);
        }

        private bool UserExists(int id)
        {
            return _IUserInfo.CheckUser(id);
        }
    }
}
