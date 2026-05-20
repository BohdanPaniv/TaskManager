using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IBoardRepository : IRepository
    {
        Task<Board?> GetByIdAsync(int userId);
        Task<Board?> GetByIdentNumberAsync(string identNumber);
        Task<IEnumerable<Board>> GetAllByUserIdAsync(int userId);
        Task<Board> CreateAsync(Board board);
        Task<Board> UpdateAsync(Board board);
        Task DeleteAsync(Board task);
    }
}
