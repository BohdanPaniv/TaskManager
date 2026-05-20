using Common.Models.BoardLists;

namespace BusinessLogic.Interfaces
{
    public interface IBoardListService : IService
    {
        Task<BoardListInfo> GetByIdAsync(int id);
        Task<IEnumerable<BoardListInfo>> GetBoardListsByIdentNumberAsync(string identNumber, int userId);
        Task<BoardListInfo> CreateAsync(CreateBoardListRequest request);
    }
}
