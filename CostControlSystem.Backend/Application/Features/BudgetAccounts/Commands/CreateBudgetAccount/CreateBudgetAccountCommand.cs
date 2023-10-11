using MediatR;

namespace Application.Features.BudgetAccounts.Commands.CreateBudgetAccount
{
    public class CreateBudgetAccountCommand
        : IRequest<Guid>
    {
        public Guid UserId { get; set; }
        public decimal Balance { get; set; } = 0;
        public string Name { get; set; } = "DEFAULT_BUDGET_ACCOUNT";
    }
}
