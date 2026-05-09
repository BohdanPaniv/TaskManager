using AppModels.Models;
using DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class BoardsRepository : IBoardsRepository
    {
        private readonly AppDbContext _context;
        public BoardsRepository(AppDbContext context) => _context = context;
        public async Task<IEnumerable<Board>> GetAllByUserIdAsync(int userId)
        {
            return await _context.Boards
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
    }
}
