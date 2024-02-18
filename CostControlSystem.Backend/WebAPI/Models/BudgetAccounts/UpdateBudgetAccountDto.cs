using Application.Common.Mappings;
using Application.Features.BudgetAccounts.Commands.UpdateBudgetAccount;

namespace WebAPI.Models.BudgetAccounts
{
    public class UpdateBudgetAccountDto
        : IMapWith<UpdateBudgetAccountCommand>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public void Mapping(AssemblyMappingProfile profile)
        {
            profile.CreateMap<UpdateBudgetAccountDto, UpdateBudgetAccountCommand>()
                .ForMember(command => command.Id,
                    opt => opt.MapFrom(dto => dto.Id))
                .ForMember(command => command.Name,
                    opt => opt.MapFrom(dto => dto.Name));
        }
    }
}
