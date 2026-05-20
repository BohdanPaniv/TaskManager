using Common.Models.Board;

namespace BusinessLogic.Interfaces
{
    public interface IBoardService : IService
    {
        Task<BoardInfo> GetByIdAsync(int boardId);
        Task<BoardInfo> GetBoardInfoAsync(string identNumber, int userId);
        Task<IEnumerable<BoardInfo>> GetByUserIdAsync(int userId);
        Task<BoardInfo> CreateAsync(CreateBoardRequest request, int userId);
        Task DeleteAsync(int userId, int taskId);
    }
}
