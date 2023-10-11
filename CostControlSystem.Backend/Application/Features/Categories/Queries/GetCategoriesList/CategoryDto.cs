using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.Categories.Queries.GetCategoriesList
{
    public class CategoryDto : IMapWith<Category>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Category, CategoryDto>()
                .ForMember(categoryDto => categoryDto.Id,
                    opt => opt.MapFrom(category => category.Id))
                .ForMember(categoryDto => categoryDto.Name,
                    opt => opt.MapFrom(category => category.Name));
        }

    }
}


