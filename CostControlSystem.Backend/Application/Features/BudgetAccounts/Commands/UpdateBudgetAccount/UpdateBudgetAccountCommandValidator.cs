using FluentValidation;

namespace Application.Features.BudgetAccounts.Commands.UpdateBudgetAccount
{
    public class UpdateBudgetAccountCommandValidator
        : AbstractValidator<UpdateBudgetAccountCommand>
    {
        public UpdateBudgetAccountCommandValidator()
        {
            RuleFor(c => c.UserId).NotEqual(Guid.Empty);
            RuleFor(c => c.Id).NotEqual(Guid.Empty);
            RuleFor(c => c.Name)
                .MaximumLength(250)
                .NotEqual(string.Empty)
                .NotNull();
        }
    }
}
