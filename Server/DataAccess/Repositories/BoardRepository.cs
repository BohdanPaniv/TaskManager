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

        public async Task<Board?> GetByIdentNumberAsync(string identNumber)
        {
            return await _context.Boards
                .FirstOrDefaultAsync(b => b.IdentNumber.ToString() == identNumber);
        }

        public async Task<IEnumerable<Board>> GetAllByUserIdAsync(int userId)
        {
            return await _context.Boards
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<Board> CreateAsync(Board board)
        {
            _context.Boards.Add(board);
            await _context.SaveChangesAsync();

            return board;
        }

        public async Task<Board> UpdateAsync(Board board)
        {
            _context.Boards.Update(board);
            await _context.SaveChangesAsync();

            return board;
        }

        public async Task DeleteAsync(Board board)
        {
            _context.Boards.Remove(board);

            await _context.SaveChangesAsync();
        }
    }
}
