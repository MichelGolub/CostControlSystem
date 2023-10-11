using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.BudgetAccounts.Commands.DeleteBudgetAccount
{
    public class DeleteBudgetAccountCommandHandler
        : IRequestHandler<DeleteBudgetAccountCommand>
    {
        private readonly ICostControlSystemDbContext _context;

        public DeleteBudgetAccountCommandHandler
            (ICostControlSystemDbContext context) => _context = context;

        public async Task Handle
            (DeleteBudgetAccountCommand request, CancellationToken cancellationToken)
        {
            var budget = await _context.BudgetAccounts
                .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException(nameof(BudgetAccount), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, request.Id);

            _context.BudgetAccounts.Remove(budget);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
