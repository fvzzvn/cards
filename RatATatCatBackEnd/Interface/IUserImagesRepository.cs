using RatATatCatBackEnd.Models.APIModels;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Interface
{
    public interface IUserImagesRepository
    {
        UserImage GetImageForUser(int userId);
        List<UserImage> GetImages();
        UserImage GetImageById(int id);
        void SaveImage(ImageInput input);
    }
}