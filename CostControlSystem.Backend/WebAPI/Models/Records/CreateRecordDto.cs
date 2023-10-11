using AutoMapper;
using Application.Common.Mappings;
using Application.Features.Records.Commands.CreateRecord;

namespace WebApi.Models.Records
{
    public class CreateRecordDto : IMapWith<CreateRecordCommand>
    {
        public Guid CategoryId { get; set; }
        public decimal Sum { get; set; }
        public DateTime CreateTime { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateRecordDto, CreateRecordCommand>()
                .ForMember(command => command.CategoryId,
                    opt => opt.MapFrom(dto => dto.CategoryId))
                .ForMember(command => command.Sum,
                    opt => opt.MapFrom(dto => dto.Sum))
                .ForMember(command => command.Date,
                    opt => opt.MapFrom(dto => dto.CreateTime));
        }
    }
}
