namespace AppModels.Models
{
    public class Board
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<BoardList> BoardLists { get; set; } = new List<BoardList>();
    }
}
