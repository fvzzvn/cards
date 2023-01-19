using System.ComponentModel.DataAnnotations;

namespace RatATatCatBackEnd.Models.Database
{
    public class UserInfo
    {
        [Key]
        public int UserId { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int Mmr { get; set; }
        public int RatMMR { get; set; }
        public int DragonMMR { get; set; }
        public int CrowMMR { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}
