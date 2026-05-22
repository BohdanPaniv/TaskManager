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
        private readonly IBoardListRepository _boardListRepo;
        private readonly IBoardRepository _boardRepo;
        private readonly IMapper _mapper;

        public TaskService(
            ITaskRepository taskRepo, 
            IBoardListRepository boardListRepo,
            IBoardRepository boardRepo,
            IMapper mapper)
        {
            _taskRepo = taskRepo;
            _boardListRepo = boardListRepo;
            _boardRepo = boardRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TaskDto>> GetAllAsync(int listId)
        {
            var tasks = await _taskRepo.GetAllByListIdAsync(listId);

            return _mapper.Map<IEnumerable<TaskDto>>(tasks);
        }

        public async Task<TaskDto> GetByIdAsync(int userId, int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");
            await CheckUserAccess(userId, task);

            return _mapper.Map<TaskDto>(task);
        }

        public async Task<TaskDto> CreateAsync(CreateTaskRequest request)
        {
            var task = new TaskItem
            {
                Title = request.Title.Trim(),
                Description = request.Description?.Trim() ?? string.Empty,
                CreatedAt = DateTime.UtcNow,
                BoardListId = request.BoardListId,
            };

            var created = await _taskRepo.CreateAsync(task);
            return _mapper.Map<TaskDto>(created);
        }

        public async Task<TaskDto> UpdateAsync(int userId, int taskId, UpdateTaskRequest request)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");
            await CheckUserAccess(userId, task);

            task.Title = request.Title.Trim();
            task.Description = request.Description?.Trim() ?? string.Empty;

            var updated = await _taskRepo.UpdateAsync(task);
            return _mapper.Map<TaskDto>(updated);
        }

        private async Task CheckUserAccess(int userId, TaskItem task)
        {
            var boardList = await _boardListRepo.GetByIdAsync(task.BoardListId)
                            ?? throw new NotFoundException("Board's list not found");

            var board = await _boardRepo.GetByIdAsync(boardList.BoardId)
                ?? throw new NotFoundException("Board not found");

            if (board.UserId != userId)
                throw new UnauthorizedException("Access denied");
        }

        public async Task DeleteAsync(int userId, int taskId)
        {
            var task = await _taskRepo.GetByIdAsync(taskId)
                ?? throw new NotFoundException("Task not found");
            await CheckUserAccess(userId, task);

            await _taskRepo.DeleteAsync(task);
        }

        public async Task<TaskDto> MoveAsync(int id, int boardListId, int userId)
        {
            var task = await _taskRepo.GetByIdAsync(id) ?? throw new NotFoundException("Task not found");
            await CheckUserAccess(userId, task);
            
            task.BoardListId = boardListId;
            var updated = await _taskRepo.UpdateAsync(task);
            return _mapper.Map<TaskDto>(updated);
        }
    }
}
