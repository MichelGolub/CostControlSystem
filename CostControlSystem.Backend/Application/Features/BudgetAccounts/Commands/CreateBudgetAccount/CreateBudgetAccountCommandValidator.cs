using FluentValidation;

namespace Application.Features.BudgetAccounts.Commands.CreateBudgetAccount
{
    public class CreateBudgetAccountCommandValidator
        : AbstractValidator<CreateBudgetAccountCommand>
    {
        public CreateBudgetAccountCommandValidator()
        {
            RuleFor(c => c.UserId).NotEqual(Guid.Empty);
            RuleFor(c => c.Name)
                .MaximumLength(250)
                .NotEqual(string.Empty)
                .NotNull();
        }
    }
}
