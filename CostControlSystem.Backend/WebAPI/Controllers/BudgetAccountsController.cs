using Application.Features.BudgetAccounts.Commands.CreateBudgetAccount;
using Application.Features.BudgetAccounts.Commands.DeleteBudgetAccount;
using Application.Features.BudgetAccounts.Commands.UpdateBudgetAccount;
using Application.Features.BudgetAccounts.Queries.GetBudgetAccountDetails;
using Application.Features.BudgetAccounts.Queries.GetBudgetAccountsList;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.BudgetAccounts;
using WebAPI.Models.BudgetAccounts;

namespace WebApi.Controllers
{
    public class BudgetAccountsController
        : BaseController
    {
        private readonly IMapper _mapper;

        public BudgetAccountsController(IMapper mapper) 
            => _mapper = mapper;

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IList<BudgetAccount>>> Get()
        {
            var query = new GetBudgetAccountsListQuery
            {
                UserId = UserId
            };
            var vm = await Mediator.Send(query);
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IList<BudgetAccount>>> Get(Guid id)
        {
            var query = new GetBudgetAccountDetailsQuery
            {
                UserId = UserId,
                Id = id
            };
            var vm = await Mediator.Send(query);
            return Ok(vm);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Guid>> Create
            ([FromBody] CreateBudgetAccountDto createBudgetAccountDto)
        {
            var command = _mapper
                .Map<CreateBudgetAccountCommand>(createBudgetAccountDto);
            command.UserId = UserId;
            var resp = await Mediator.Send(command);
            return Ok(resp);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update
            (Guid id, [FromBody] UpdateBudgetAccountDto updateBudgetAccountDto)
        {
            if (updateBudgetAccountDto.Id != id)
            {
                return Conflict();
            }
            var command = _mapper
                .Map<UpdateBudgetAccountCommand>(updateBudgetAccountDto);
            command.UserId = UserId;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteBudgetAccountCommand()
            {
                UserId = UserId,
                Id = id
            };
            await Mediator.Send(command);
            return NoContent();
        }
    }
}
