using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Records.Commands.UpdateRecord
{
    public class UpdateRecordCommandHandler 
        : IRequestHandler<UpdateRecordCommand>
    {
        private readonly ICostControlSystemDbContext _context;

        public UpdateRecordCommandHandler
            (ICostControlSystemDbContext context) =>
            _context = context;

        public async Task Handle
            (UpdateRecordCommand request, CancellationToken cancellationToken)
        {
            var record = await _context.Records
                .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException(nameof(Record), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            var category = await helper.GetCategory(request.CategoryId);
            await helper.CheckUserToBudgetAccountAsync
                (request.UserId, category.BudgetAccountId);

            record.CategoryId = request.CategoryId;
            record.Sum = request.Sum;
            record.Date = request.Date;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
