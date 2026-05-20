using AppModels.Models;
using AutoMapper;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using Common.Models.Board;
using Common.Models.Boards;
using Common.Models.Tasks;
using DataAccess.Repositories.Interfaces;
using BoardModel = AppModels.Models.Board;

namespace BusinessLogic.Services.Board
{
    public class BoardService : IBoardService
    {
        private readonly IBoardRepository _boardRepo;
        private readonly IMapper _mapper;
        public BoardService(IBoardRepository boardRepo, IMapper mapper)
        {
            _boardRepo = boardRepo;
            _mapper = mapper;
        }

        public async Task<BoardInfo> GetByIdAsync(int boardId)
        {
            var board = await _boardRepo.GetByIdAsync(boardId);

            if (board == null)
            {
                throw new NotFoundException("Board not found");
            }

            return _mapper.Map<BoardInfo>(board);
        }

        public async Task<BoardInfo> GetBoardInfoAsync(string identNumber, int userId)
        {
            var board = await _boardRepo.GetByIdentNumberAsync(identNumber);

            if (board == null)
            {
                throw new NotFoundException("Board not found");
            }

            if (board.UserId != userId)
            {
                throw new UnauthorizedException("Access denied");
            }

            return _mapper.Map<BoardInfo>(board);
        }

        public async Task<IEnumerable<BoardInfo>> GetByUserIdAsync(int userId)
        {
            var boards = await _boardRepo.GetAllByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<BoardInfo>>(boards);
        }

        public async Task<BoardInfo> CreateAsync(CreateBoardRequest request, int userId)
        {
            var board = new BoardModel
            {
                Title = request.Title.Trim(),
                CreatedAt = DateTime.Now,
                UserId = userId,
            };

            var created = await _boardRepo.CreateAsync(board);
            return _mapper.Map<BoardInfo>(created);
        }

        public async Task<BoardInfo> UpdateAsync(UpdateBoardRequest request, int boardId, int userId)
        {
            var board = await _boardRepo.GetByIdAsync(boardId)
                ?? throw new NotFoundException("Board not found");

            if (board.UserId != userId)
                throw new UnauthorizedException("Access denied");

            board.Title = request.Title.Trim();

            var updated = await _boardRepo.UpdateAsync(board);
            return _mapper.Map<BoardInfo>(updated);
        }

        public async Task DeleteAsync(int userId, int boardId)
        {
            var board = await _boardRepo.GetByIdAsync(boardId)
                ?? throw new NotFoundException("Board not found");

            if (board.UserId != userId)
                throw new UnauthorizedException("Access denied");

            await _boardRepo.DeleteAsync(board);
        }
    }
}
