using MediatR;

namespace Application.Features.UserToBudgets.Queries.GetUsersToBudget
{
    public class GetUsersToBudgetQuery
        : IRequest<IList<Guid>>
    {
        public Guid UserId { get; set; }
        public Guid BudgetAccountId { get; set; }
    }
}
