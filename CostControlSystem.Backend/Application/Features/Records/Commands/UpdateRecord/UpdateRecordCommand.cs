using MediatR;

namespace Application.Features.Records.Commands.UpdateRecord
{
    public class UpdateRecordCommand : IRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Sum { get; set; }
        public DateTime Date { get; set; }
    }
}
