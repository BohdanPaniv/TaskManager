using BusinessLogic.Interfaces;
using BusinessLogic.Services.Tasks;
using Common.Extensions;
using Common.Models.BoardLists;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BoardListController : ControllerBase
    {
        private readonly IBoardListService _boardListService;
        private int UserId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        public BoardListController(IBoardListService boardListService) => _boardListService = boardListService;

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var board = await _boardListService.GetByIdAsync(id);
            return Ok(ApiResponse<BoardListDto>.Ok(board));
        }

        [HttpGet("{identNumber}")]
        public async Task<IActionResult> GetBoardListsByIdentNumber(string identNumber)
        {
            var boardLists = await _boardListService.GetBoardListsByIdentNumberAsync(identNumber, UserId);
            return Ok(ApiResponse<IEnumerable<BoardListDto>>.Ok(boardLists));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBoardListRequest request)
        {
            var boardList = await _boardListService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = boardList.Id }, ApiResponse<BoardListDto>.Ok(boardList));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _boardListService.DeleteAsync(UserId, id);
            return NoContent();
        }
    }
}