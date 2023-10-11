using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQueryHandler 
        : IRequestHandler<GetCategoryDetailsQuery, GetCategoryDetailsVm>
    {
        private readonly ICostControlSystemDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoryDetailsQueryHandler
            (ICostControlSystemDbContext context, IMapper mapper) 
            => (_context, _mapper) = (context, mapper);

        public async Task<GetCategoryDetailsVm> Handle
            (GetCategoryDetailsQuery request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(category => 
                    category.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException(nameof(Domain.Entities.Category), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, category.BudgetAccountId);

            return _mapper.Map<GetCategoryDetailsVm>(category);
        }
    }
}
   