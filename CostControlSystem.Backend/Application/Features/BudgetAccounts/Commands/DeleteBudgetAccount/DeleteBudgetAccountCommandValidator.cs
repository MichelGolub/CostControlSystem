using FluentValidation;

namespace Application.Features.BudgetAccounts.Commands.DeleteBudgetAccount
{
    public class DeleteBudgetAccountCommandValidator
        : AbstractValidator<DeleteBudgetAccountCommand>
    {
        public DeleteBudgetAccountCommandValidator()
        {
            RuleFor(c => c.Id).NotEqual(Guid.Empty);
            RuleFor(c => c.UserId).NotEqual(Guid.Empty);
        }
    }
}
