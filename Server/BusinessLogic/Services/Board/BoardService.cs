using AutoMapper;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using Common.Models.Boards;
using DataAccess.Repositories.Interfaces;

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
    }
}
