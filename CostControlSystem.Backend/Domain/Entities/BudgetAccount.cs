namespace Domain.Entities
{
    public class BudgetAccount
    {
        public Guid Id { get; set; }
        public decimal Balance { get; set; }
        public string Name { get; set; }
    }
}
