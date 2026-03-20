using AppModels.Models;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using Common.Models.Tasks;
using DataAccess.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace BusinessLogic.Services.Tasks
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;

        public TaskService(ITaskRepository taskRepo)
        {
            _taskRepo = taskRepo;
        }


        public async Task<IEnumerable<TaskDto>> GetAllAsync(int userId)
        {
            var tasks = await _taskRepo.GetAllByUserIdAsync(userId);

            return tasks.Select(ToDto);
        }

        public async Task<TaskDto> GetByIdAsync(int userId, int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
                throw new UnauthorizedException("Access denied");

            return ToDto(task);
        }

        public async Task<TaskDto> CreateAsync(int userId, CreateTaskRequest request)
        {
            var task = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                UserId = userId
            };

            var created = await _taskRepo.CreateAsync(task);
            return ToDto(created);
        }

        public async Task<TaskDto> UpdateAsync(int userId, int taskId, UpdateTaskRequest request)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
                throw new UnauthorizedException("Access denied");

            task.Title = request.Title;
            task.Description = request.Description;
            task.IsCompleted = request.IsCompleted;

            var updated = await _taskRepo.UpdateAsync(task);
            return ToDto(updated);
        }

        public async Task DeleteAsync(int userId, int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
                throw new UnauthorizedException("Access denied");

            await _taskRepo.DeleteAsync(task);
        }

        private static TaskDto ToDto(TaskItem task) => new(
            task.Id,
            task.Title,
            task.Description,
            task.IsCompleted,
            task.CreatedAt
        );
    }
}
