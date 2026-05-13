using BusinessLogic.Interfaces;
using Common.Extensions;
using Common.Models.Board;
using Common.Models.Boards;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/boards")]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;
        private int UserId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        public BoardController(IBoardService boardService) => _boardService = boardService;
        
        [HttpGet]
        public async Task<IActionResult> GetAllByUserId()
        {
            var boards = await _boardService.GetByUserIdAsync(UserId);
            return Ok(ApiResponse<IEnumerable<BoardDto>>.Ok(boards));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var board = await _boardService.GetByIdAsync(id);
            return Ok(ApiResponse<BoardDto>.Ok(board));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBoardRequest request)
        {
            var board = await _boardService.CreateAsync(request, UserId);
            return CreatedAtAction(nameof(GetById), new { id = board.Id }, ApiResponse<BoardDto>.Ok(board));
        }
    }
}