using Common.Models.BoardLists;

namespace BusinessLogic.Interfaces
{
    public interface IBoardListService : IService
    {
        Task<IEnumerable<BoardListInfo>> GetBoardListsByIdentNumberAsync(string identNumber, int userId);
        Task<BoardListInfo> CreateAsync(int userId, CreateBoardListRequest request);
    }
}
