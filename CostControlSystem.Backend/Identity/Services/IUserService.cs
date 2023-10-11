using Identity.Models;

namespace Identity.Services
{
    public interface IUserService
    {
        Task RegisterAsync(RegisterModel model);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
        Task<AuthenticationModel> RefreshTokenAsync(string token);
        Task AddRoleAsync(ModifyRoleModel model);
        Task RemoveRoleAsync(ModifyRoleModel model);
        bool RevokeToken(string token);
        Task<UserInfo> GetUserInfo(Guid id);
    }
}
