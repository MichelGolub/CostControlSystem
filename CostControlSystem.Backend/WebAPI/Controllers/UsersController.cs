using Application.Features.UserToBudgets.Queries.GetUsersToBudget;
using Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class UsersController
        : BaseController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
            => _userService = userService;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get
            ([FromQuery] Guid budgetAccountId)
        {
            var usersIds = await Mediator
                .Send(
                    new GetUsersToBudgetQuery 
                    { 
                        UserId = UserId,
                        BudgetAccountId = budgetAccountId 
                    });

            var res = new List<object>();
            foreach (var id in usersIds)
            {
                var userInfo = await _userService.GetUserInfo(id);
                res.Add(new { id, userName = userInfo.UserName });
            }
            return Ok(res);
        }
    }
}
