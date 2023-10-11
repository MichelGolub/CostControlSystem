using MediatR;

namespace Application.Features.BudgetAccounts.Commands.UpdateBudgetAccount
{
    public class UpdateBudgetAccountCommand
        : IRequest
    {
        public Guid UserId { get; set; }   
        public Guid Id { get; set; }
        public decimal Balance { get; set; }
        public string Name { get; set; }
    }
}
