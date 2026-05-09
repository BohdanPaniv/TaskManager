using AppModels.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface ITaskRepository : IRepository
    {
        Task<IEnumerable<TaskItem>> GetAllByListIdAsync(int listId);
        Task<TaskItem?> GetByIdAsync(int taskId);
        Task<TaskItem> CreateAsync(TaskItem task);
        Task<TaskItem> UpdateAsync(TaskItem task);
        Task DeleteAsync(TaskItem task);
    }
}
