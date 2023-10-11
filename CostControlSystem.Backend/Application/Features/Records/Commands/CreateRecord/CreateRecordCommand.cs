using MediatR;

namespace Application.Features.Records.Commands.CreateRecord
{
    public class CreateRecordCommand : IRequest<Guid>
    {
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Sum { get; set; }
        public DateTime Date { get; set; }
    }
}
