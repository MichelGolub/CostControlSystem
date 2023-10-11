using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.BudgetAccounts.Commands.UpdateBudgetAccount
{
    public class UpdateBudgetAccountCommandHandler
        : IRequestHandler<UpdateBudgetAccountCommand>
    {
        private readonly ICostControlSystemDbContext _context;

        public UpdateBudgetAccountCommandHandler
            (ICostControlSystemDbContext context) => _context = context;

        public async Task Handle
            (UpdateBudgetAccountCommand request, CancellationToken cancellationToken)
        {
            var budget = await _context.BudgetAccounts
                .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException(nameof(BudgetAccount), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, request.Id);

            budget.Name = request.Name;
            budget.Balance = request.Balance;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
