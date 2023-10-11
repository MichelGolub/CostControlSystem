using Application.Common.Utils;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Records.Queries.GetRecordsList
{
    public class GetRecordsListQueryHandler 
        : IRequestHandler<GetRecordsListQuery, IList<RecordLookupDto>>
    {
        private readonly ICostControlSystemDbContext _context;
        private readonly IMapper _mapper;

        public GetRecordsListQueryHandler
            (ICostControlSystemDbContext context, IMapper mapper) => 
            (_context, _mapper) = (context, mapper);

        public async Task<IList<RecordLookupDto>> Handle
            (GetRecordsListQuery request, CancellationToken cancellationToken)
        {
            var helper = new DbHelper(_context, cancellationToken);
            await helper
                .CheckUserToBudgetAccountAsync(request.UserId, request.BudgetAccountId);

            var recordsDtos = new List<RecordLookupDto>();

            var categories = await _context.Categories
                .Where(c => c.BudgetAccountId == request.BudgetAccountId)
                .ToListAsync(cancellationToken);

            foreach (var category in categories)
            {
                var categoryDto = _mapper.Map<CategoryLookupDto>(category);
                var records = await _context.Records
                    .Where(r => r.CategoryId == category.Id)
                    .ToListAsync(cancellationToken);
                foreach (var record in records)
                {
                    var dto = _mapper.Map<RecordLookupDto>(record);
                    dto.Category = categoryDto;
                    recordsDtos.Add(dto);
                }
            }

            return recordsDtos;
        }
    }
}
