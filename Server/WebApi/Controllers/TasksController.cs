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
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService) => _taskService = taskService;

        private int UserId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllAsync(UserId);
            return Ok(ApiResponse<IEnumerable<TaskDto>>.Ok(tasks));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetByIdAsync(UserId, id);
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTaskRequest request)
        {
            var task = await _taskService.CreateAsync(UserId, request);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, ApiResponse<TaskDto>.Ok(task));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateTaskRequest request)
        {
            var task = await _taskService.UpdateAsync(UserId, id, request);
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _taskService.DeleteAsync(UserId, id);
            return NoContent();
        }
    }
}
