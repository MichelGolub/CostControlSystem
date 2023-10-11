using FluentValidation;

namespace Application.Features.Records.Queries.GetRecordDetails
{
    public class GetRecordDetailsQueryValidator
        : AbstractValidator<GetRecordDetailsQuery>
    {
        public GetRecordDetailsQueryValidator() 
        {
            RuleFor(query => query.Id).NotEqual(Guid.Empty);
            RuleFor(query => query.UserId).NotEqual(Guid.Empty);
        }
    }
}
