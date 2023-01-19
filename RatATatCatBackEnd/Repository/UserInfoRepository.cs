using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;
using RatATatCatBackEnd.Models.Database;

namespace RatATatCatBackEnd.Repository
{
    public class UserInfoRepository : IUserInfo
    {
        readonly DatabaseContext _dbContext = new();

        public UserInfoRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUser(UserInfo user)
        {
            try
            {
                _dbContext.UserInfos.Add(user);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public bool CheckUser(int id)
        {
            return _dbContext.UserInfos.Any(e => e.UserId == id);
        }

        public UserInfo DeleteUser(int id)
        {
            try
            {
                UserInfo user = _dbContext.UserInfos.Find(id);

                if (user != null)
                {
                    _dbContext.UserInfos.Remove(user);
                    _dbContext.SaveChanges();
                    return user;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch {
                throw;
            }
        }

        public List<UserInfo> GetTop50()
        {
            try
            {
                var users = _dbContext.UserInfos.
                    OrderByDescending(u => u.RatMMR)
                    .Take(50)
                    .ToList();
                return users;
            }
            catch
            {
                throw new Exception("Couldn't fetch top 50 players");
            }
        }

        public UserInfo GetUserInfo(int id)
        {
            try
            {
                UserInfo user = _dbContext.UserInfos.Find(id);
                if (user != null)
                {
                    return user;
                }
                else
                {
                    throw new ArgumentNullException("No user found");
                }
            }
            catch
            {
                throw;
            }
        }

        public UserInfo GetUserInfoByUserName(string username)
        {
            try
            {
                UserInfo user = _dbContext.UserInfos.Where(u => u.UserName == username).First();
                if (user != null)
                {
                    return user;
                }
                throw new ArgumentNullException("No user found");
            }
            catch
            {
                throw;
            }

        }
        public List<UserInfo> GetUsers()
        {
            try
            {
                return _dbContext.UserInfos.ToList();
            }
            catch
            {
                throw;
            }
        }

        public void UpdateUser(UserInfo user)
        {
            try
            {
                _dbContext.Entry(user).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}
