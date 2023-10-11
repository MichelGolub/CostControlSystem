namespace Domain.Entities
{
    public class UserToBudget
    {
        public Guid BudgetAccountId { get; set; }
        public Guid UserId { get; set; }
    }
}
