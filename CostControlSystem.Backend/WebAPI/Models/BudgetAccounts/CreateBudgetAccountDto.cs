using Application.Common.Mappings;
using Application.Features.BudgetAccounts.Commands.CreateBudgetAccount;

namespace WebApi.Models.BudgetAccounts
{
    public class CreateBudgetAccountDto
        : IMapWith<CreateBudgetAccountCommand>
    {
        public string Name { get; set; }

        public void Mapping(AssemblyMappingProfile profile)
        {
            profile.CreateMap<CreateBudgetAccountDto, CreateBudgetAccountCommand>()
                .ForMember(command => command.Name,
                    opt => opt.MapFrom(dto => dto.Name));
        }
    }
}
