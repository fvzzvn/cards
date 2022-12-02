using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RatATatCatBackEnd.Models.Database
{
    public class BoardInstance
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string BoardName { get; set; }
        public int BoardType { get; set; }
        public int BoardMode { get; set; }
    }
}
