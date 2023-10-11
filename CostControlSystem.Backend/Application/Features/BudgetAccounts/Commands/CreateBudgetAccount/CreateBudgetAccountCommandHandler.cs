using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.BudgetAccounts.Commands.CreateBudgetAccount
{
    public class CreateBudgetAccountCommandHandler
        : IRequestHandler<CreateBudgetAccountCommand, Guid>
    {
        private readonly ICostControlSystemDbContext _context;

        public CreateBudgetAccountCommandHandler
            (ICostControlSystemDbContext context) => _context = context;

        public async Task<Guid> Handle
            (CreateBudgetAccountCommand request, CancellationToken cancellationToken)
        {
            var budget = new BudgetAccount()
            {
                Id = Guid.NewGuid(),
                Balance = request.Balance,
                Name = request.Name
            };

            var userToBudget = new UserToBudget
            {
                UserId = request.UserId,
                BudgetAccountId = budget.Id
            };

            _context.BudgetAccounts.Add(budget);
            _context.UserToBudget.Add(userToBudget);
            await _context.SaveChangesAsync(cancellationToken);

            return budget.Id;
        }
    }
}
