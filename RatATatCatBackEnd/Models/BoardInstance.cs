using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RatATatCatBackEnd.Models
{
    public class BoardInstance
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int BoardType { get; set; } 
        public int BoardMode { get; set; }
    }
}
