using MediatR;

namespace Application.Features.Records.Commands.DeleteRecord
{
    public class DeleteRecordCommand : IRequest
    {
        public Guid UserId { get; set; }
        public Guid Id { get; set; }
    }
}
