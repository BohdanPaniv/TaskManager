using AppModels.Models;
using DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class BoardListRepository : IBoardListRepository
    {
        private readonly AppDbContext _context;

        public BoardListRepository(AppDbContext context) => _context = context;

        public async Task<BoardList?> GetByIdAsync(int id)
        {
            return await _context.BoardLists.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<BoardList> CreateAsync(BoardList boardList)
        {
            _context.BoardLists.Add(boardList);
            await _context.SaveChangesAsync();

            return boardList;
        }

        public async Task<IEnumerable<BoardList>> GetByBoardId(int boardId)
        {
            return await _context.BoardLists.Where(t => t.BoardId == boardId).ToListAsync();
        }
    }
}
