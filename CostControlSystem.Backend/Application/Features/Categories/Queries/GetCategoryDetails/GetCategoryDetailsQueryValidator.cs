using FluentValidation;

namespace Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQueryValidator
        : AbstractValidator<GetCategoryDetailsQuery>
    {
        public GetCategoryDetailsQueryValidator() 
        {
            RuleFor(query => query.UserId).NotEqual(Guid.Empty);
            RuleFor(query => query.Id).NotEqual(Guid.Empty);
        }
    }
}
