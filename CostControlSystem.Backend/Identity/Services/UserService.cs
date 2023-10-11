using Identity.Constants;
using Identity.Contexts;
using Identity.Entities;
using Identity.Enums;
using Identity.Exceptions;
using Identity.Models;
using Identity.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Identity.Services
{
    public class UserService : IUserService
    {
        private readonly IdentityContext _context;
        private readonly UserManager<User> _userManager;
        private readonly JWT _jwt;

        public UserService(IdentityContext context,
            UserManager<User> userManager,
            IOptions<JWT> jwt)
        {
            _context = context;
            _userManager = userManager;
            _jwt = jwt.Value;
        }

        public async Task AddRoleAsync(ModifyRoleModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email)
                ?? throw new KeyNotFoundException($"There is no USER with EMAIL {model.Email}");
            var roleExists = Enum.GetNames(typeof(Roles))
                .Any(r => r.ToLower() == model.Role.ToLower());
            if (!roleExists)
            {
                throw new KeyNotFoundException($"There is no ROLE with NAME {model.Role}");
            }
            var validRole = Enum.GetValues(typeof(Roles))
                .Cast<Roles>()
                .Where(r => r.ToString().ToLower() == model.Role.ToLower())
                .FirstOrDefault();
            await _userManager.AddToRoleAsync(user, validRole.ToString());
        }

        public async Task RemoveRoleAsync(ModifyRoleModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email)
                ?? throw new KeyNotFoundException($"There is no USER with EMAIL {model.Email}");
            var roleExists = Enum.GetNames(typeof(Roles))
                .Any(r => r.ToLower() == model.Role.ToLower());
            if (!roleExists)
            {
                throw new KeyNotFoundException($"There is no ROLE with NAME {model.Role}");
            }
            var validRole = Enum.GetValues(typeof(Roles))
                .Cast<Roles>()
                .Where(r => r.ToString().ToLower() == model.Role.ToLower())
                .FirstOrDefault();
            await _userManager.RemoveFromRoleAsync(user, validRole.ToString());
        }

        public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model)
        {
            var authModel = new AuthenticationModel();
            var user = await _userManager.FindByEmailAsync(model.Email)
                ?? throw new UserNotFoundException(model.Email);

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                throw new IncorrectPasswordException();
            }

            JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
            authModel.Token = new JwtSecurityTokenHandler()
                .WriteToken(jwtSecurityToken);
            authModel.Email = user.Email;
            authModel.UserName = user.UserName;
            var roleList = await _userManager.GetRolesAsync(user)
                .ConfigureAwait(false);
            authModel.Roles = roleList.ToList();

            var activeRefreshToken = user.RefreshTokens
                .Where(a => a.IsActive == true)
                .FirstOrDefault();
            if (activeRefreshToken == null)
            {
                activeRefreshToken = CreateRefreshToken();
                user.RefreshTokens.Add(activeRefreshToken);
                await _userManager.UpdateAsync(user);
            }
            authModel.RefreshToken = activeRefreshToken.Token;
            authModel.RefreshTokenExpiration = activeRefreshToken.Expires;

            return authModel;
        }

        private async Task<JwtSecurityToken> CreateJwtToken(User user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();

            foreach (var role in roles) 
            {
                roleClaims.Add(new Claim("roles", role));
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials
                (symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken
            (
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials
            );

        }

        private RefreshToken CreateRefreshToken(double durationIdDays = 8)
        {
            var randomNumber = new byte[32];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(randomNumber);
                return new RefreshToken()
                {
                    Token = Convert.ToBase64String(randomNumber),
                    Expires = DateTime.UtcNow.AddDays(durationIdDays),
                    Created = DateTime.UtcNow
                };
            }
        }

        public async Task<AuthenticationModel> RefreshTokenAsync(string token)
        {
            var authModel = new AuthenticationModel();
            var user = _context.Users.SingleOrDefault
                (u => u.RefreshTokens.Any(t => t.Token == token))
                ?? throw new UserNotFoundException();

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);
            if (!refreshToken.IsActive)
            {
                throw new UnauthorizedException();
            }

            refreshToken.Revoked = DateTime.UtcNow;

            var newRefreshToken = CreateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            _context.Update(user);
            _context.SaveChanges();

            JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
            authModel.Token = new JwtSecurityTokenHandler()
                .WriteToken(jwtSecurityToken);
            authModel.Email = user.Email;
            authModel.UserName = user.UserName;
            var roleList = await _userManager.GetRolesAsync(user)
                .ConfigureAwait(false);
            authModel.Roles = roleList.ToList();
            authModel.RefreshToken = newRefreshToken.Token;
            authModel.RefreshTokenExpiration = newRefreshToken.Expires;
            return authModel;
        }

        public async Task RegisterAsync(RegisterModel model)
        {
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var userWithSameEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userWithSameEmail != null)
            {
                throw new ConflictException($"User with same Email ({user.Email} is already exist)");
            }

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager
                    .AddToRoleAsync(user, Authorization.DEFAULT_ROLE.ToString());
                return;
            }
            throw new ConflictException("User with same username already exists");
        }

        public bool RevokeToken(string token)
        {
            var user = _context.Users.SingleOrDefault
                (u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
            {
                return false;
            }

            var refreshToken = user.RefreshTokens.Single
                (u => u.Token == token);
            if (!refreshToken.IsActive)
            {
                return false;
            }

            refreshToken.Revoked = DateTime.UtcNow;
            _context.Update(user);
            _context.SaveChanges();
            return true;
        }

        public async Task<UserInfo> GetUserInfo(Guid id)
        {
            var user = await _context.Users
                .SingleAsync(u => u.Id == id.ToString());

            var userInfo = new UserInfo();
            userInfo.UserName = user.UserName;
            return userInfo;
        }
    }
}
