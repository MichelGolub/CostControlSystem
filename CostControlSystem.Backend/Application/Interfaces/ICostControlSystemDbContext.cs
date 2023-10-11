using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces
{
    public interface ICostControlSystemDbContext
    {
        DbSet<BudgetAccount> BudgetAccounts { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Record> Records { get; set; }
        DbSet<UserToBudget> UserToBudget { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
