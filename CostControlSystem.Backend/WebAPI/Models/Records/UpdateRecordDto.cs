using Application.Common.Mappings;
using Application.Features.Records.Commands.UpdateRecord;
using AutoMapper;

namespace WebApi.Models.Records
{
    public class UpdateRecordDto : IMapWith<UpdateRecordCommand>
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Sum { get; set; }
        public DateTime CreateTime { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateRecordDto, UpdateRecordCommand>()
                .ForMember(command => command.Id,
                    opt => opt.MapFrom(dto => dto.Id))
                .ForMember(command => command.CategoryId,
                    opt => opt.MapFrom(dto => dto.CategoryId))
                .ForMember(command => command.Sum,
                    opt => opt.MapFrom(dto => dto.Sum))
                .ForMember(command => command.Date,
                    opt => opt.MapFrom(dto => dto.CreateTime));
        }
    }
}
