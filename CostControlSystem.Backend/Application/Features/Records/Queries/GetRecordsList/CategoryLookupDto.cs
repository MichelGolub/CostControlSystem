using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.Records.Queries.GetRecordsList
{
    public class CategoryLookupDto : IMapWith<Category>
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Category, CategoryLookupDto>()
                .ForMember(dto => dto.Id,
                    opt => opt.MapFrom(c => c.Id))
                .ForMember(dto => dto.Name,
                    opt => opt.MapFrom(c => c.Name));
        }
    }
}