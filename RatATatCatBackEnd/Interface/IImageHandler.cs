
namespace RatATatCatBackEnd.Interface
{
    public interface IImageHandler
    {
        List<string> GetFilesPaths();

        string GetFilePath(int id);
    }
}
