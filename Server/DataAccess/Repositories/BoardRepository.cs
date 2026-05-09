using AppModels.Models;
using DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class BoardRepository : IBoardRepository
    {
        private readonly AppDbContext _context;
        public BoardRepository(AppDbContext context) => _context = context;

        public async Task<Board?> GetByIdAsync(int boardId)
        {
            return await _context.Boards
                .FirstOrDefaultAsync(b => b.Id == boardId);
        }
    }
}
