using AppModels.Models;
using Common.Models.Board;
using Common.Models.Boards;

namespace BusinessLogic.Interfaces
{
    public interface IBoardService : IService
    {
        Task<BoardDto> GetByIdAsync(int boardId);
        Task<IEnumerable<BoardDto>> GetByUserIdAsync(int userId);
        Task<BoardDto> CreateAsync(CreateBoardRequest request, int userId);
    }
}
