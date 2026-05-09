using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IBoardListRepository: IRepository
    {
        Task<BoardList?> GetByIdAsync(int listId);
        Task<BoardList> CreateAsync(BoardList list);
    }
}
