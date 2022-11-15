using RatATatCatBackEnd.Models.APIModels;
using RatATatCatBackEnd.Models.Database;
using Microsoft.AspNetCore.Hosting;
using RatATatCatBackEnd.Interface;

namespace RatATatCatBackEnd.Repository
{
    public class UserImagesRepository : IUserImagesRepository
    {
        private readonly DatabaseContext _db;
        private readonly IImageHandler _imageHandler;
        public UserImagesRepository(DatabaseContext db, IImageHandler imageHandler)
        {
            _db = db;
            _imageHandler = imageHandler;
        }

        public void SaveImage(ImageInput input)
        {
            string path = _imageHandler.GetFilePath(input.ImageId);
            try
            {
                UserImage nui = new UserImage { ImagePath = path, UserId = input.UserId };
                _db.UserImages.Add(nui);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public List<UserImage> GetImages()
        {
            try
            {
                return _db.UserImages.ToList();
            }
            catch
            {
                throw;
            }
        }

        public UserImage GetImageForUser(int userId)
        {
            try
            {
                return _db.UserImages.Where(x => x.UserId == userId).First();
            }
            catch
            {
                throw;
            }
        }

        public UserImage GetImageById(int id)
        {
            try
            {
                return _db.UserImages.Where(x => x.Id == id).First();
            }
            catch
            {
                throw;
            }
        }
    }
}
