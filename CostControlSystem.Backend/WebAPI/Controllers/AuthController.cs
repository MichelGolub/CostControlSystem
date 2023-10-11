using Identity.Models;
using Identity.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
            => _userService = userService;

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterModel model)
        {
            await _userService.RegisterAsync(model);
            return NoContent();
        }

        [HttpPost("token")]
        public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
        {
            var result = await _userService.GetTokenAsync(model);
            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Headers["refreshToken"];
            var response = await _userService.RefreshTokenAsync(refreshToken);
            return Ok(response);
        }
    }
}
