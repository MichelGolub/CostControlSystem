using MediatR;

namespace Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsQuery : IRequest<GetCategoryDetailsVm>
    {
        public Guid UserId { get; set; }
        public Guid Id { get; set; }
    }
}
