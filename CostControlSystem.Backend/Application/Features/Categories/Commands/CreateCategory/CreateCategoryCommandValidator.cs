using FluentValidation;

namespace Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandValidator
        : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidator() 
        {
            RuleFor(command => command.BudgetAccountId).NotEqual(Guid.Empty);
            RuleFor(command => command.Name)
                .MaximumLength(50)
                .NotEqual(string.Empty)
                .NotNull();
        }
    }
}
