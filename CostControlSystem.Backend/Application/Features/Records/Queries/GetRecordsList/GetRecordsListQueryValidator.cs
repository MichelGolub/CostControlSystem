using FluentValidation;

namespace Application.Features.Records.Queries.GetRecordsList
{
    public class GetRecordsListQueryValidator
        : AbstractValidator<GetRecordsListQuery>
    {
        public GetRecordsListQueryValidator() 
        {
            RuleFor(query => query.UserId).NotEqual(Guid.Empty);
            RuleFor(query => query.BudgetAccountId).NotEqual(Guid.Empty);
        }
    }
}
