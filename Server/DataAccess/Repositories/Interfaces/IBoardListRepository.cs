using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IBoardListRepository: IRepository
    {
        Task<BoardList?> GetByIdAsync(int id);
        Task<IEnumerable<BoardList>> GetByBoardId(int boardId);
        Task<BoardList> CreateAsync(BoardList list);
    }
}
