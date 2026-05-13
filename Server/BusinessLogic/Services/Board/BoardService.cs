using AutoMapper;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using Common.Models.Board;
using Common.Models.Boards;
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

        public async Task<BoardDto> GetByIdAsync(int boardId)
        {
            var board = await _boardRepo.GetByIdAsync(boardId);

            if (board == null)
            {
                throw new NotFoundException("Board not found");
            }

            return _mapper.Map<BoardDto>(board);
        }

        public async Task<IEnumerable<BoardDto>> GetByUserIdAsync(int userId)
        {
            var boards = await _boardRepo.GetAllByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<BoardDto>>(boards);
        }

        public async Task<BoardDto> CreateAsync(CreateBoardRequest request, int userId)
        {
            var board = new BoardModel
            {
                Title = request.Title.Trim(),
                CreatedAt = DateTime.Now,
                UserId = userId,
            };

            var created = await _boardRepo.CreateAsync(board);
            return _mapper.Map<BoardDto>(created);
        }
    }
}
