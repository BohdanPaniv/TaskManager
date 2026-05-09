namespace AppModels.Models
{
    public class BoardList
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int BoardId { get; set; }
        public Board Board { get; set; } = null!;
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
