using FluentValidation;

namespace Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandValidator
        : AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator() 
        {
            RuleFor(command => command.UserId).NotEqual(Guid.Empty);
            RuleFor(command => command.Id).NotEqual(Guid.Empty);
            RuleFor(command => command.Name)
                .MaximumLength(250)
                .NotEqual(string.Empty)
                .NotNull();
        }
    }
}
