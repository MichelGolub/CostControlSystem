using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommandHandler 
        : IRequestHandler<DeleteCategoryCommand>
    {
        private readonly ICostControlSystemDbContext _context;

        public DeleteCategoryCommandHandler
            (ICostControlSystemDbContext context) =>
            _context = context;

        public async Task Handle
            (DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories
               .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken)
               ?? throw new NotFoundException(nameof(Domain.Entities.Category), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, category.BudgetAccountId);

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
