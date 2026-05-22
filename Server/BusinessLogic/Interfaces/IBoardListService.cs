using Common.Models.BoardLists;

namespace BusinessLogic.Interfaces
{
    public interface IBoardListService : IService
    {
        Task<BoardListDto> GetByIdAsync(int id);
        Task<IEnumerable<BoardListDto>> GetBoardListsByIdentNumberAsync(string identNumber, int userId);
        Task<BoardListDto> CreateAsync(CreateBoardListRequest request);
        Task DeleteAsync(int userId, int boardListId);
    }
}
