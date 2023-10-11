using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Records.Queries.GetRecordDetails
{
    public class GetRecordListQueryHandler 
        : IRequestHandler<GetRecordDetailsQuery, RecordDetailsVm>
    {
        private readonly ICostControlSystemDbContext _context;
        private readonly IMapper _mapper;

        public GetRecordListQueryHandler
            (ICostControlSystemDbContext context, IMapper mapper) => 
            (_context, _mapper) = (context, mapper);

        public async Task<RecordDetailsVm> Handle
            (GetRecordDetailsQuery request, CancellationToken cancellationToken)
        {
            var record = await _context.Records
                .FirstOrDefaultAsync(r => 
                    r.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException(nameof(Domain.Entities.Record), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            var category = await helper.GetCategory(record.CategoryId);
            await helper.CheckUserToBudgetAccountAsync(request.UserId, category.BudgetAccountId);

            var recordVm = _mapper.Map<RecordDetailsVm>(record);
            recordVm.Category = _mapper.Map<CategoryDto>(category);

            return recordVm;
        }
    }
}
