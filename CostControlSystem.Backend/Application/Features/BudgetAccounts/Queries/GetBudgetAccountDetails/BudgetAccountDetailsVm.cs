using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Features.BudgetAccounts.Queries.GetBudgetAccountDetails
{
    public class BudgetAccountDetailsVm : IMapWith<BudgetAccount>
    {
        public Guid Id { get; set; }
        public decimal Balance { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<BudgetAccount, BudgetAccountDetailsVm>()
                .ForMember(badVm => badVm.Id,
                    opt => opt.MapFrom(ba => ba.Id))
                .ForMember(badVm => badVm.Balance,
                    opt => opt.MapFrom(ba => ba.Balance))
                .ForMember(badVm => badVm.Name,
                    opt => opt.MapFrom(ba => ba.Name));
        }
    }
}
