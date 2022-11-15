using RatATatCatBackEnd.Interface;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace RatATatCatBackEnd
{
    public class ImageHandler : IImageHandler
    {
        private readonly IHostingEnvironment _env;
        public ImageHandler(IHostingEnvironment env) 
        {
            _env = env;
        }
        public string GetFilePath(int id)
        {
            var wwwroot = _env.WebRootPath;
            var userImages = wwwroot + "/UserImages"; 

            DirectoryInfo userImagesInf = new DirectoryInfo(userImages);

            FileInfo[] file = userImagesInf.GetFiles("p" + id + ".png");

            if (file != null) 
            {
                return file.First().FullName;
            }
            return "";
        }

        public List<string> GetFilesPaths()
        {
            List<string> list = new List<string>();
            var wwwroot = _env.WebRootPath;
            var userImages = wwwroot + "\\UserImages";

            DirectoryInfo userImagesInf = new DirectoryInfo(userImages);
            FileInfo[] files = userImagesInf.GetFiles();

            foreach (FileInfo file in files)
            {
                list.Add(file.Name);
            }

            return list;
        }
    }
}
