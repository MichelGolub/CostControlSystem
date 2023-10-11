using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Persistance
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection
           services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<CostControlSystemDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });
            services.AddScoped<ICostControlSystemDbContext>(provider =>
                provider.GetService<CostControlSystemDbContext>());
            return services;
        }
    }
}
