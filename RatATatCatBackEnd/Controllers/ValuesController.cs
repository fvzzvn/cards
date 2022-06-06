using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;

namespace RatATatCatBackEnd.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IUserInfo _IUserInfo;

        public ValuesController(IUserInfo IUserInfo)
        {
            _IUserInfo = IUserInfo;
        }

        // GET: api/employee>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserInfo>>> Get()
        {
            return await Task.FromResult(_IUserInfo.GetUsers());
        }
    }
}
