using Application.Common.Utils;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQueryHandler : 
        IRequestHandler<GetCategoriesListQuery, IList<CategoryDto>>
    {
        private readonly ICostControlSystemDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoriesListQueryHandler
            (ICostControlSystemDbContext context, IMapper mapper) 
            => (_context, _mapper) = (context, mapper);

        public async Task<IList<CategoryDto>> Handle
            (GetCategoriesListQuery request, CancellationToken cancellationToken)
        {
            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, request.BudgetAccountId);

            var categoriesDtos = await _context.Categories
                .Where(category => category.BudgetAccountId == request.BudgetAccountId)
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return categoriesDtos;
        }
    }
}
