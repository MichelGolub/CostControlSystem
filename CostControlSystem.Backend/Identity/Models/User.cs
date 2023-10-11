using Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace Identity.Models
{
    public class User : IdentityUser
    {
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}
