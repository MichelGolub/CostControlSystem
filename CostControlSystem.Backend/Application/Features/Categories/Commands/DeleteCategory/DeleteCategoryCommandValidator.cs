using FluentValidation;

namespace Application.Features.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommandValidator
        : AbstractValidator<DeleteCategoryCommand>
    {
        public DeleteCategoryCommandValidator() 
        {
            RuleFor(command => command.Id).NotEqual(Guid.Empty);
            RuleFor(command => command.UserId).NotEqual(Guid.Empty);
        }
    }
}
