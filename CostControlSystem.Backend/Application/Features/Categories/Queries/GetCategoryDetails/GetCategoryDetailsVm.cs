using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.Categories.Queries.GetCategoryDetails
{
    public class GetCategoryDetailsVm : IMapWith<Category>
    {
        public Guid Id { get; set; }
        public Guid BudgetAccountId { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Category, GetCategoryDetailsVm>()
                .ForMember(categoryVm => categoryVm.Id,
                opt => opt.MapFrom(category => category.Id))
                .ForMember(categoryVm => categoryVm.BudgetAccountId,
                opt => opt.MapFrom(category => category.BudgetAccountId))
                .ForMember(categoryVm => categoryVm.Name,
                opt => opt.MapFrom(category => category.Name));
        }
    }
}
