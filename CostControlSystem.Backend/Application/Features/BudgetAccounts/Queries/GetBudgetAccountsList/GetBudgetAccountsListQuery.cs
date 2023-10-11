using MediatR;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountsList
{
    public class GetBudgetAccountsListQuery 
        : IRequest<IList<BudgetAccountDto>>
    {
        public Guid UserId { get; set; }
    }
}
