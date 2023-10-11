using Application.Common.Utils;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.UserToBudgets.Queries.GetUsersToBudget
{
    public class GetUsersToBudgetQueryHandler
        : IRequestHandler<GetUsersToBudgetQuery, IList<Guid>>
    {
        private readonly ICostControlSystemDbContext _context;

        public GetUsersToBudgetQueryHandler
            (ICostControlSystemDbContext context) => 
            _context = context;

        public async Task<IList<Guid>> Handle
            (GetUsersToBudgetQuery request, CancellationToken cancellationToken)
        {
            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, request.BudgetAccountId);

            var usersToBudget = await _context.UserToBudget
                .Where(utb => utb.BudgetAccountId == request.BudgetAccountId)
                .ToListAsync(cancellationToken);
            var res = new List<Guid>(usersToBudget.Count);
            foreach (var utb in usersToBudget)
            {
                res.Add(utb.UserId);
            }

            return res;
        }
    }
}
