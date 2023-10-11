using Application.Common.Utils;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountsList
{
    public class GetBudgetAccountsListQueryHandler
        : IRequestHandler<GetBudgetAccountsListQuery, IList<BudgetAccountDto>>
    {
        private readonly ICostControlSystemDbContext _сontext;
        private readonly IMapper _mapper;

        public GetBudgetAccountsListQueryHandler
            (ICostControlSystemDbContext context, IMapper mapper)
            => (_сontext, _mapper) = (context, mapper);

        public async Task<IList<BudgetAccountDto>> Handle
            (GetBudgetAccountsListQuery request, CancellationToken cancellationToken)
        {
            var helper = new DbHelper(_сontext, cancellationToken);
            var budgetsIds = await helper
                .GetBudgetAccountsIdsForUserAsync(request.UserId);

            var budgetsDtos = new List<BudgetAccountDto>();
            foreach (var budgetId in budgetsIds)
            {
                var budget = await _сontext.BudgetAccounts
                    .FirstAsync(b => b.Id == budgetId,
                        cancellationToken);
                var budgetDto = _mapper.Map<BudgetAccountDto>(budget);
                budgetsDtos.Add(budgetDto);
            }

            return budgetsDtos;
        }
    }
}
