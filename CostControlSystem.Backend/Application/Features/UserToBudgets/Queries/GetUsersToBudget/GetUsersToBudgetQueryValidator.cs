using FluentValidation;

namespace Application.Features.UserToBudgets.Queries.GetUsersToBudget
{
    public class GetUsersToBudgetQueryValidator
        : AbstractValidator<GetUsersToBudgetQuery>
    {
        public GetUsersToBudgetQueryValidator()
        {
            RuleFor(q => q.UserId).NotEqual(Guid.Empty);
            RuleFor(q => q.BudgetAccountId).NotEqual(Guid.Empty);
        }
    }
}
