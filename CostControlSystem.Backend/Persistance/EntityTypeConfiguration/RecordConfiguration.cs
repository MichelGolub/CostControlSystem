using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Persistance.EntityTypeConfiguration
{
    public class RecordConfiguration : IEntityTypeConfiguration<Record>
    {
        public void Configure(EntityTypeBuilder<Record> builder)
        {
            builder.HasKey(record => record.Id);
            builder.HasIndex(record => record.Id).IsUnique();
            builder.Property(record => record.Sum)
                .HasPrecision(19, 2)
                .IsRequired();
            builder.HasOne<Category>()
                .WithMany()
                .HasForeignKey(record => record.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

