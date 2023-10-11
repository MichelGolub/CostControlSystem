using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountsList
{
    public class BudgetAccountDto : IMapWith<BudgetAccount>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<BudgetAccount, BudgetAccountDto>()
                .ForMember(dto => dto.Id,
                    opt => opt.MapFrom(ba => ba.Id))
                .ForMember(dto => dto.Name,
                    opt => opt.MapFrom(ba => ba.Name));
        }
    }
}
