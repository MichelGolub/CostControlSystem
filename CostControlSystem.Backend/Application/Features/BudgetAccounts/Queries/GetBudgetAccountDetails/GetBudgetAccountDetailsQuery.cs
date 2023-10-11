using MediatR;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountDetails
{
    public class GetBudgetAccountDetailsQuery
        : IRequest<BudgetAccountDetailsVm>
    {
        public Guid UserId { get; set; }
        public Guid Id { get; set; }
    }
}
