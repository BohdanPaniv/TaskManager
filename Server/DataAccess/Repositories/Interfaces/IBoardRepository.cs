using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IBoardRepository : IRepository
    {
        Task<Board?> GetByIdAsync(int userId);
        Task<IEnumerable<Board>> GetAllByUserIdAsync(int userId);
        Task<Board> CreateAsync(Board board);
    }
}
