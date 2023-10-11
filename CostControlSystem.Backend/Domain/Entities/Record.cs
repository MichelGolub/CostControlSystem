namespace Domain.Entities
{
    public class Record
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal Sum { get; set; }
        public DateTime Date { get; set; }
        public Guid CategoryId { get; set; }
    }
}
