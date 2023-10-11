using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistance.EntityTypeConfiguration
{
    internal class CategoryConfiguration
        : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);
            builder.HasOne<BudgetAccount>()
                .WithMany()
                .HasForeignKey(c => c.BudgetAccountId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Property(c => c.Name).HasMaxLength(50);
        }
    }
}
