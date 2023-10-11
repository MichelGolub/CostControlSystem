using Application.Common.Utils;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountDetails
{
    public class GetBudgetAccountDetailsQueryHandler
        : IRequestHandler<GetBudgetAccountDetailsQuery, BudgetAccountDetailsVm>
    {
        private readonly ICostControlSystemDbContext _context;
        private readonly IMapper _mapper;

        public GetBudgetAccountDetailsQueryHandler
            (ICostControlSystemDbContext context, IMapper mapper) 
            => (_context, _mapper) = (context, mapper);

        public async Task<BudgetAccountDetailsVm> Handle
            (GetBudgetAccountDetailsQuery request, CancellationToken cancellationToken)
        {
            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, request.Id);

            var budget = await _context
                .BudgetAccounts.FirstAsync(b => b.Id == request.Id,
                    cancellationToken);

            var budgetVm = _mapper.Map<BudgetAccountDetailsVm>(budget);

            return budgetVm;
        }
    }
}
