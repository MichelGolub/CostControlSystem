using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistance.EntityTypeConfiguration
{
    internal class UserToBudgetConfiguration
        : IEntityTypeConfiguration<UserToBudget>
    {
        public void Configure(EntityTypeBuilder<UserToBudget> builder)
        {
            builder.HasKey(utb => new { utb.UserId, utb.BudgetAccountId });
            builder.HasOne<BudgetAccount>()
                .WithMany()
                .HasForeignKey(utb => utb.BudgetAccountId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
