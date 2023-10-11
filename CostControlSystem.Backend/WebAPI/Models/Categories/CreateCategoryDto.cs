using Application.Common.Mappings;
using Application.Features.Categories.Commands.CreateCategory;
using AutoMapper;

namespace WebApi.Models.Categories
{
    public class CreateCategoryDto : IMapWith<CreateCategoryCommand>
    {
        public Guid BudgetAccountId { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateCategoryDto, CreateCategoryCommand>()
                .ForMember(command => command.BudgetAccountId,
                    opt => opt.MapFrom(dto => dto.BudgetAccountId))
                .ForMember(command => command.Name,
                    opt => opt.MapFrom(dto => dto.Name));
        }
    }
}
