using FluentValidation;

namespace Application.Features.Records.Commands.UpdateRecord
{
    public class UpdateRecordCommandValidator
        : AbstractValidator<UpdateRecordCommand>
    {
        public UpdateRecordCommandValidator() 
        {
            RuleFor(command => command.Id).NotEqual(Guid.Empty);
            RuleFor(command => command.UserId).NotEqual(Guid.Empty);
            RuleFor(command => command.CategoryId).NotEqual(Guid.Empty);
        }
    }
}
