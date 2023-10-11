using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistance.EntityTypeConfiguration
{
    internal class BudgetAccountConfiguration
        : IEntityTypeConfiguration<BudgetAccount>
    {
        public void Configure(EntityTypeBuilder<BudgetAccount> builder)
        {
            builder.HasKey(ba => ba.Id);
            builder.Property(ba => ba.Balance)
                .HasPrecision(19, 2)
                .IsRequired();
            builder.Property(ba => ba.Name).HasMaxLength(250);
        }
    }
}
