using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IUserRepository : IRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<User> CreateAsync(User user);
        Task<bool> ExistsAsync(string email);
    }
}
