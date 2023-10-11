using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistance.EntityTypeConfiguration;

namespace Persistance
{
    public class CostControlSystemDbContext : DbContext, ICostControlSystemDbContext
    {
        public DbSet<BudgetAccount> BudgetAccounts { get ; set ; }
        public DbSet<Category> Categories { get ; set; }
        public DbSet<Record> Records { get ; set ; }
        public DbSet<UserToBudget> UserToBudget { get ; set ; }
        public CostControlSystemDbContext(DbContextOptions<CostControlSystemDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new BudgetAccountConfiguration());
            builder.ApplyConfiguration(new CategoryConfiguration());
            builder.ApplyConfiguration(new RecordConfiguration());
            builder.ApplyConfiguration(new UserToBudgetConfiguration());
            base.OnModelCreating(builder);
        }
    }
}