using AppModels.Models;
using Common.Models.Boards;

namespace BusinessLogic.Interfaces
{
    public interface IBoardService : IService
    {
        Task<BoardDto> GetByIdAsync(int boardId);
    }
}
