using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Utils
{
    internal class DbHelper
    {
        private readonly ICostControlSystemDbContext _context;
        private readonly CancellationToken _cancellationToken = default;

        public DbHelper
            (ICostControlSystemDbContext context,
            CancellationToken cancellationToken)
            => (_context, _cancellationToken) = (context, cancellationToken);

        public async Task<Category> GetCategory
            (Guid categoryId)
        {
            return await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.Id == categoryId,
                    _cancellationToken)
                ?? throw new NotFoundException
                    (nameof(Category), categoryId);
        }

        public async Task<List<Guid>> GetBudgetAccountsIdsForUserAsync
            (Guid userId)
        {
            var ids = new List<Guid>();

            var userToBudgetList = await _context.UserToBudget
                .Where(utb => utb.UserId == userId)
                .ToListAsync(_cancellationToken);
            foreach (var userToBudget in userToBudgetList)
            {
                ids.Add(userToBudget.BudgetAccountId);
            }
            return ids;
        }

        public async Task<Unit> CheckUserToBudgetAccountAsync
            (Guid userId, Guid budgetAccountId)
        {
            var _ = await _context
                .UserToBudget
                .FirstOrDefaultAsync(utb => utb.UserId == userId
                    && utb.BudgetAccountId == budgetAccountId, _cancellationToken)
                ?? throw new NotFoundException(nameof(UserToBudget),
                    $"{userId}, {budgetAccountId}");
            return Unit.Value;
        }
    }
}
