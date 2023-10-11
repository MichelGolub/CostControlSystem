using MediatR;

namespace Application.Features.BudgetAccounts.Commands.DeleteBudgetAccount
{
    public class DeleteBudgetAccountCommand
        : IRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
    }
}
