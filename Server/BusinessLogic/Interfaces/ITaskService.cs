using Common.Models.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllAsync(int userId);
        Task<TaskDto> GetByIdAsync(int userId, int taskId);
        Task<TaskDto> CreateAsync(int userId, CreateTaskRequest request);
        Task<TaskDto> UpdateAsync(int userId, int taskId, UpdateTaskRequest request);
        Task DeleteAsync(int userId, int taskId);
    }
}
