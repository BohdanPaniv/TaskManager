using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IBoardsRepository : IRepository
    {
        Task<IEnumerable<Board>> GetAllByUserIdAsync(int userId);
    }
}
