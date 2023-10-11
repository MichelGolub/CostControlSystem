using FluentValidation;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountsList
{
    public class GetBudgetAccountsListQueryValidator
        : AbstractValidator<GetBudgetAccountsListQuery>
    {
        public GetBudgetAccountsListQueryValidator()
        {
            RuleFor(q => q.UserId).NotEqual(Guid.Empty);
        }
    }
}
