using Common.Models.BoardLists;

namespace Common.Models.Boards
{
    public class BoardDto
    {
        public int Id { get; set; }
        public Guid IdentNumber { get; set; }
        public required string Title { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<BoardListDto> BoardLists { get; set; } = new List<BoardListDto>();
    }
}
