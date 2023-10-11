using System.ComponentModel.DataAnnotations;

namespace Identity.Models
{
    public class ModifyRoleModel
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Role { get; set; }
    }
}
