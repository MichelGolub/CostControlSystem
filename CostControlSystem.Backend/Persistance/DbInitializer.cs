namespace Persistance
{
    public class DbInitializer
    {
        public static void Initialize(CostControlSystemDbContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
