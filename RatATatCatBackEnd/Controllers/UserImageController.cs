using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.APIModels;
using RatATatCatBackEnd.Models.Database;
using System.Text.RegularExpressions;

namespace RatATatCatBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserImageController : ControllerBase
    {
        private readonly IImageHandler _imgHandler;
        private readonly IUserImagesRepository _userImagesRepository;
        public UserImageController(IImageHandler imgHandler, IUserImagesRepository userImagesRepository)
        {
            _imgHandler = imgHandler;
            _userImagesRepository = userImagesRepository;
        }

        [Route("GetImagesIds")]
        [HttpGet]
        public async Task<IActionResult> GetAvailableImages()
        {
            List<string> ids = new List<string>();
            var images = _imgHandler.GetFilesPaths();

            foreach(var image in images)
            {
                var resultString = Regex.Match(image, @"\d+").Value;
                ids.Add(resultString);
            }

            return Ok(ids);
        }
        [Route("GetImageForId")]
        [HttpGet]
        public async Task<IActionResult> GetImageById(int id)
        {
            var path = _imgHandler.GetFilePath(id);

            Byte[] b = System.IO.File.ReadAllBytes(path);

            return File(b, "image/png");
        }
        [HttpGet]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = _userImagesRepository.GetImageForUser(id);

            Byte[] b = System.IO.File.ReadAllBytes(image.ImagePath);

            return File(b, "image/png");
        }

        [HttpPost]
        public async Task<IActionResult> SaveImage(ImageInput input)
        {
            _userImagesRepository.SaveImage(input);

            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> EditImage(ImageInput input)
        {
            UserImage current = _userImagesRepository.GetImageForUser(input.UserId);
            var path = _imgHandler.GetFilePath(input.ImageId);

            UserImage newEntry = new UserImage { Id = current.Id,ImagePath = path, UserId = current.UserId};
            _userImagesRepository.EditImage(newEntry);

            return Ok();
        }
    }
}
