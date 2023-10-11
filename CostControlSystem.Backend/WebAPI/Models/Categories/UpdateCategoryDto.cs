using Application.Common.Mappings;
using Application.Features.Categories.Commands.UpdateCategory;
using AutoMapper;

namespace WebApi.Models.Categories
{
    public class UpdateCategoryDto : IMapWith<UpdateCategoryCommand>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateCategoryDto, UpdateCategoryCommand>()
                .ForMember(command => command.Id,
                    opt => opt.MapFrom(dto => dto.Id))
                .ForMember(command => command.Name,
                    opt => opt.MapFrom(dto => dto.Name));
        }
    }
}
