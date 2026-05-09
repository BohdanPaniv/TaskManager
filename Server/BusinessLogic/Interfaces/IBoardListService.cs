using Common.Models.BoardLists;

namespace BusinessLogic.Interfaces
{
    public interface IBoardListService : IService
    {
        Task<BoardListDto> GetByIdAsync(int userId, int listId);
        Task<BoardListDto> CreateAsync(int userId, CreateBoardListRequest request);
    }
}
