using AppModels.Models;
using AutoMapper;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using Common.Models.Tasks;
using DataAccess.Repositories.Interfaces;

namespace BusinessLogic.Services.Tasks
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;
        private readonly IMapper _mapper;

        public TaskService(ITaskRepository taskRepo, IMapper mapper)
        {
            _taskRepo = taskRepo;
            _mapper = mapper;
        }


        public async Task<IEnumerable<TaskDto>> GetAllAsync(int userId)
        {
            var tasks = await _taskRepo.GetAllByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<TaskDto>>(tasks);
        }

        public async Task<TaskDto> GetByIdAsync(int userId, int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
                throw new UnauthorizedException("Access denied");

            return _mapper.Map<TaskDto>(task);
        }

        public async Task<TaskDto> CreateAsync(int userId, CreateTaskRequest request)
        {
            var task = new TaskItem
            {
                Title = request.Title.Trim(),
                Description = request.Description?.Trim() ?? string.Empty,
                UserId = userId,
                Status = request.Status
            };

            var created = await _taskRepo.CreateAsync(task);
            return _mapper.Map<TaskDto>(created);
        }

        public async Task<TaskDto> UpdateAsync(int userId, int taskId, UpdateTaskRequest request)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
                throw new UnauthorizedException("Access denied");

            task.Title = request.Title.Trim();
            task.Description = request.Description?.Trim() ?? string.Empty;
            task.IsCompleted = request.IsCompleted;

            var updated = await _taskRepo.UpdateAsync(task);
            return _mapper.Map<TaskDto>(updated);
        }

        public async Task DeleteAsync(int userId, int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
                throw new UnauthorizedException("Access denied");

            await _taskRepo.DeleteAsync(task);
        }

        public async Task<TaskDto> MoveAsync(int userId, int taskId, string status)
        {
            var task = await _taskRepo.GetByIdAsync(taskId) ?? throw new NotFoundException("Task not found");

            if (task.UserId != userId)
            {
                throw new UnauthorizedException("Access denied");
            }

            task.Status = status.Trim().ToLower();
            var updated = await _taskRepo.UpdateAsync(task);
            return _mapper.Map<TaskDto>(updated);
        }
    }
}
