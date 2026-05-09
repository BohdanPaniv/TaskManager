using AutoMapper;
using BusinessLogic.Interfaces;
using Common.Models.Boards;
using DataAccess.Repositories.Interfaces;

namespace BusinessLogic.Services.Boards
{
    public class BoardsService : IBoardsService
    {
        private readonly IBoardsRepository _boardsRepo;
        private readonly IMapper _mapper;
        public BoardsService(IBoardsRepository boardsRepo, IMapper mapper)
        {
            _boardsRepo = boardsRepo;
            _mapper = mapper;
        }
        public async Task<IEnumerable<BoardDto>> GetByUserIdAsync(int userId)
        {
            var boards = await _boardsRepo.GetAllByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<BoardDto>>(boards);
        }
    }
}
