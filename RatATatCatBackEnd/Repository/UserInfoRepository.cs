using Microsoft.EntityFrameworkCore;
using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models;

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
