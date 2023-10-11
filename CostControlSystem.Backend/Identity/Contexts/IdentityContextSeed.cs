using Identity.Constants;
using Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Identity.Contexts
{
    public class IdentityContextSeed
    {
        public static async Task SeedEssentialAsync
            (UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            foreach (var role in Enum.GetValues(typeof(Enums.Roles))) 
            {
                await roleManager.CreateAsync
                (
                    new IdentityRole(role.ToString())
                );
            }

            var defaultUser = new User
            {
                UserName = Authorization.DEFAULT_USERNAME,
                Email = Authorization.DEFAULT_EMAIL,
                EmailConfirmed = true
            };

            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                await userManager
                    .CreateAsync(defaultUser, Authorization.DEFAULT_PASSWORD);
                await userManager
                    .AddToRoleAsync(defaultUser, Authorization.DEFAULT_ROLE.ToString());
            }
        }
    }
}
