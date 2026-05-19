using BusinessLogic.Interfaces;
using Common.Extensions;
using Common.Models.Board;
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
            return Ok(ApiResponse<IEnumerable<BoardInfo>>.Ok(boards));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var board = await _boardService.GetByIdAsync(id);
            return Ok(ApiResponse<BoardInfo>.Ok(board));
        }

        [HttpGet("{identNumber}")]
        public async Task<IActionResult> GetBoardInfo(string identNumber)
        {
            var board = await _boardService.GetBoardInfoAsync(identNumber, UserId);
            return Ok(ApiResponse<BoardInfo>.Ok(board));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBoardRequest request)
        {
            var board = await _boardService.CreateAsync(request, UserId);
            return CreatedAtAction(nameof(GetById), new { id = board.Id }, ApiResponse<BoardInfo>.Ok(board));
        }
    }
}