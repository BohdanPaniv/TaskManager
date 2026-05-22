using BusinessLogic.Interfaces;
using Common.Extensions;
using Common.Models.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService) => _taskService = taskService;

        private int UserId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetAll(int listId)
        {
            var tasks = await _taskService.GetAllAsync(listId);
            return Ok(ApiResponse<IEnumerable<TaskDto>>.Ok(tasks));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetByIdAsync(UserId, id);
            return Ok(ApiResponse<TaskDto>.Ok(task));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTaskRequest request)
        {
            var task = await _taskService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, ApiResponse<TaskDto>.Ok(task));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateTaskRequest request)
        {
            var task = await _taskService.UpdateAsync(UserId, id, request);
            return Ok(ApiResponse<TaskDto>.Ok(task));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _taskService.DeleteAsync(UserId, id);
            return NoContent();
        }

        [HttpPatch("{id}/move")]
        public async Task<IActionResult> Move(int id, [FromBody] MoveTaskRequest request)
        {
            var task = await _taskService.MoveAsync(id, request.BoardListId, UserId);
            return Ok(ApiResponse<TaskDto>.Ok(task));
        }
    }
}
