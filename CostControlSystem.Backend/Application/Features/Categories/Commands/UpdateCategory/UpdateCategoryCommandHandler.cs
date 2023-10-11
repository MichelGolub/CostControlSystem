using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandHandler 
        : IRequestHandler<UpdateCategoryCommand>
    {
        private readonly ICostControlSystemDbContext _context;

        public UpdateCategoryCommandHandler
            (ICostControlSystemDbContext context) =>
            _context = context;

        public async Task Handle
            (UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(category => category.Id == request.Id,
                    cancellationToken)
                ?? throw new NotFoundException(nameof(Domain.Entities.Category),
                    request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            await helper
                .CheckUserToBudgetAccountAsync(request.UserId, category.BudgetAccountId);

            category.Name = request.Name;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
