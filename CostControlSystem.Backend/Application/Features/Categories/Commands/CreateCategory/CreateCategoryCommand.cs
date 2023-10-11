using MediatR;

namespace Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<Guid>
    {
        public Guid BudgetAccountId { get; set; }
        public string Name { get; set; }
    }
}
