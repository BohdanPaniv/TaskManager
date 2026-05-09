using Common.Models.Boards;

namespace BusinessLogic.Interfaces
{
    public interface IBoardsService : IService
    {
        Task<IEnumerable<BoardDto>> GetByUserIdAsync(int userId);
    }
}
