using BusinessLogic.Interfaces;
using Common.Extensions;
using Common.Models.Boards;
using Common.Models.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BoardsController : ControllerBase
    {
        private readonly IBoardsService _boardsService;
        private int UserId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        public BoardsController(IBoardsService boardsService) => _boardsService = boardsService;
        [HttpGet]
        public async Task<IActionResult> GetAllByUserId()
        {
            var boards = await _boardsService.GetByUserIdAsync(UserId);
            return Ok(ApiResponse<IEnumerable<BoardDto>>.Ok(boards));
        }
    }
}