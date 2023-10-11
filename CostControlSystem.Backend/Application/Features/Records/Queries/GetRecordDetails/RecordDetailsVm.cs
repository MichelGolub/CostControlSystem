using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.Records.Queries.GetRecordDetails
{
    public class RecordDetailsVm : IMapWith<Record>
    {
        public Guid UserId { get; set; }
        public Guid Id { get; set; }
        public int Sum { get; set; }
        public DateTime Date { get; set; }
        public CategoryDto Category { get; set; } = new CategoryDto();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Record, RecordDetailsVm>()
                .ForMember(recordVm => recordVm.UserId,
                    opt => opt.MapFrom(record => record.UserId))
                .ForMember(recordVm => recordVm.Id,
                    opt => opt.MapFrom(record => record.Id))
                .ForMember(recordVm => recordVm.Sum,
                    opt => opt.MapFrom(record => record.Sum))
                .ForMember(recordVm => recordVm.Date,
                    opt => opt.MapFrom(record => record.Date));
        }
    }
}
