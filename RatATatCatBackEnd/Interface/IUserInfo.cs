using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Interface
{
    public interface IUserInfo
    {
        public List<UserInfo> GetUsers();
        public UserInfo GetUserInfo(int id);
        public void AddUser(UserInfo user);
        public void UpdateUser(UserInfo user);
        public UserInfo DeleteUser(int id);
        public bool CheckUser(int id);
    }
}
