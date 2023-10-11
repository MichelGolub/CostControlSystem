using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.Records.Queries.GetRecordsList
{
    public class RecordLookupDto : IMapWith<Record>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int Sum { get; set; }
        public DateTime Date { get; set; }
        public CategoryLookupDto Category { get; set; } = new CategoryLookupDto();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Record, RecordLookupDto>()
                .ForMember(recordDto => recordDto.Id,
                    opt => opt.MapFrom(record => record.Id))
                .ForMember(recordDto => recordDto.UserId,
                    opt => opt.MapFrom(record => record.UserId))
                .ForMember(recordDto => recordDto.Sum,
                    opt => opt.MapFrom(record => record.Sum))
                .ForMember(recordDto => recordDto.Date,
                    opt => opt.MapFrom(record => record.Date));
        }
    }
}
