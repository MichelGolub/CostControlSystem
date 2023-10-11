using MediatR;

namespace Application.Features.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQuery 
        : IRequest<IList<CategoryDto>>
    {
        public Guid UserId { get; set; }
        public Guid BudgetAccountId { get; set; }
    }
}
