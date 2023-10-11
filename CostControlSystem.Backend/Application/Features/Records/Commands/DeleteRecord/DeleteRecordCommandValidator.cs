using FluentValidation;

namespace Application.Features.Records.Commands.DeleteRecord
{
    public class DeleteRecordCommandValidator
        : AbstractValidator<DeleteRecordCommand>
    {
        public DeleteRecordCommandValidator()
        {
            RuleFor(command => command.UserId).NotEqual(Guid.Empty);
            RuleFor(command => command.Id).NotEqual(Guid.Empty);
        }
    }
}
