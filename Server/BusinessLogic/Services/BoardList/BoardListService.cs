using AppModels.Models;
using AutoMapper;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using Common.Models.BoardLists;
using DataAccess.Repositories.Interfaces;

namespace BusinessLogic.Services.Lists
{
    public class BoardListService : IBoardListService
    {
        private readonly IBoardListRepository _boardListRepo;
        private readonly IBoardRepository _boardRepository;
        private readonly IMapper _mapper;

        public BoardListService(
            IBoardListRepository boardListRepo,
            IBoardRepository boardRepository, 
            IMapper mapper)
        {
            _boardListRepo = boardListRepo;
            _boardRepository = boardRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BoardListDto>> GetBoardListsByIdentNumberAsync(string identNumber, int userId)
        {
            var board = await _boardRepository.GetByIdentNumberAsync(identNumber);

            if (board == null)
            {
                throw new NotFoundException("Board not found");
            }

            if (board.UserId != userId)
            {
                throw new UnauthorizedException("Access denied");
            }

            var boardLists = await _boardListRepo.GetByBoardId(board.Id);

            return _mapper.Map<IEnumerable<BoardListDto>>(boardLists);
        }

        public async Task<BoardListDto> CreateAsync(CreateBoardListRequest request)
        {
            var boardList = new BoardList
            {
                Title = request.Title.Trim(),
                CreatedAt = DateTime.Now,
                BoardId = request.BoardId,
            };

            var created = await _boardListRepo.CreateAsync(boardList);
            return _mapper.Map<BoardListDto>(created);
        }

        public async Task<BoardListDto> GetByIdAsync(int id)
        {
            var boardList = await _boardListRepo.GetByIdAsync(id);

            if (boardList == null)
            {
                throw new NotFoundException("Board's list not found");
            }

            return _mapper.Map<BoardListDto>(boardList);
        }

        public async Task DeleteAsync(int userId, int boardListId)
        {
            var boardList = await _boardListRepo.GetByIdAsync(boardListId)
                ?? throw new NotFoundException("Board's list not found");

            var board = await _boardRepository.GetByIdAsync(boardList.BoardId)
                ?? throw new NotFoundException("Board not found");
            if (board.UserId != userId)
                throw new UnauthorizedException("Access denied");

            await _boardListRepo.DeleteAsync(boardList);
        }
    }
}
