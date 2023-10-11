using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandHandler 
        : IRequestHandler<CreateCategoryCommand, Guid>
    {
        private readonly ICostControlSystemDbContext _context;

        public CreateCategoryCommandHandler
            (ICostControlSystemDbContext context) =>
            _context = context;

        public async Task<Guid> Handle
            (CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                Id = Guid.NewGuid(),
                BudgetAccountId = request.BudgetAccountId,
                Name = request.Name
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync(cancellationToken);

            return category.Id;
        }

    }
}
