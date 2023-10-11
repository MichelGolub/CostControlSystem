using Application.Common.Utils;
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Records.Commands.CreateRecord
{
    public class CreateRecordCommandHandler 
        : IRequestHandler<CreateRecordCommand, Guid>
    {
        private readonly ICostControlSystemDbContext _context;
        
        public CreateRecordCommandHandler
            (ICostControlSystemDbContext context) =>
                _context = context;

        public async Task<Guid> Handle
            (CreateRecordCommand request, CancellationToken cancellationToken)
        {
            var helper = new DbHelper(_context, cancellationToken);

            var category = await helper.GetCategory(request.CategoryId);
            await helper.CheckUserToBudgetAccountAsync
                (request.UserId, category.BudgetAccountId);

            var record = new Record
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                CategoryId = request.CategoryId,
                Sum = request.Sum,
                Date = request.Date
            };

            _context.Records.Add(record);
            await _context.SaveChangesAsync(cancellationToken);

            return record.Id;
        }
    }
}
