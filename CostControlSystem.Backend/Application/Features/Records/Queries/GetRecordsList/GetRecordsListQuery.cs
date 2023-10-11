using MediatR;

namespace Application.Features.Records.Queries.GetRecordsList
{
    public class GetRecordsListQuery 
        : IRequest<IList<RecordLookupDto>>
    {
        public Guid UserId { get; set; }
        public Guid BudgetAccountId { get; set; }
    }
}
