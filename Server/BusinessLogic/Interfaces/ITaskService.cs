using Common.Models.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface ITaskService : IService
    {
        Task<IEnumerable<TaskDto>> GetAllAsync(int listId);
        Task<TaskDto> GetByIdAsync(int userId, int taskId);
        Task<TaskDto> CreateAsync(CreateTaskRequest request);
        Task<TaskDto> UpdateAsync(int userId, int taskId, UpdateTaskRequest request);
        Task DeleteAsync(int userId, int taskId);
        Task<TaskDto> MoveAsync(int id, int boardListId, int userId);
    }
}
