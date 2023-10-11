using FluentValidation;

namespace Application.Features.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQueryValidator
        : AbstractValidator<GetCategoriesListQuery>
    {
        public GetCategoriesListQueryValidator() 
        {
            RuleFor(query => query.UserId).NotEqual(Guid.Empty);
            RuleFor(query => query.BudgetAccountId).NotEqual(Guid.Empty);
        }
    }
}
