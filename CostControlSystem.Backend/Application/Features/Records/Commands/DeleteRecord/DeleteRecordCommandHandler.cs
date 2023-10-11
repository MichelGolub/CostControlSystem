using Application.Common.Exceptions;
using Application.Common.Utils;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Records.Commands.DeleteRecord
{
    internal class DeleteRecordCommandHandler 
        : IRequestHandler<DeleteRecordCommand>
    {
        private readonly ICostControlSystemDbContext _context;

        public DeleteRecordCommandHandler
            (ICostControlSystemDbContext context) =>
            _context = context;

        public async Task Handle
            (DeleteRecordCommand request, CancellationToken cancellationToken)
        {
            var record = await _context.Records
                .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException(nameof(Record), request.Id);

            var helper = new DbHelper(_context, cancellationToken);
            var category = await helper.GetCategory(record.CategoryId);
            await helper.CheckUserToBudgetAccountAsync
                (request.UserId, category.BudgetAccountId);

            _context.Records.Remove(record);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
