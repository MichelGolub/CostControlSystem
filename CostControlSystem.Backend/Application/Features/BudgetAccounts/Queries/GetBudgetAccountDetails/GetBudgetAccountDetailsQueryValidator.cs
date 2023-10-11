using FluentValidation;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountDetails
{
    public class GetBudgetAccountDetailsQueryValidator
        : AbstractValidator<GetBudgetAccountDetailsQuery>
    {
        public GetBudgetAccountDetailsQueryValidator()
        {
            RuleFor(q => q.UserId).NotEqual(Guid.Empty);
            RuleFor(q => q.Id).NotEqual(Guid.Empty);
        }
    }
}
