using FluentValidation;

namespace Application.Features.Records.Commands.CreateRecord
{
    public class CreateRecordCommandValidator
        : AbstractValidator<CreateRecordCommand>
    {
        public CreateRecordCommandValidator()
        {
            RuleFor(command => command.UserId).NotEqual(Guid.Empty);
            RuleFor(command => command.CategoryId)
                .NotEqual(Guid.Empty);
        }
    }
}
