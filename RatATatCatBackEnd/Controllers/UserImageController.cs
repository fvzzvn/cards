using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RatATatCatBackEnd.Models.APIModels;

namespace RatATatCatBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public UserImageController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile image)
        {
            try
            {
                if (image.Length > 0)
                {
                    string imagePath = _env.WebRootPath + "\\UserImages";
                    if (!Directory.Exists(imagePath))
                    {
                        Directory.CreateDirectory(imagePath);
                    }

                    using (FileStream fileStream = System.IO.File.Create(imagePath + "\\"+ image.FileName))
                    {
                        await image.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }
                }
            } catch (Exception ex)
            {
                throw ex;
            }
            return Ok();
        }
    }
}
