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

        public async Task<IEnumerable<BoardListInfo>> GetBoardListsByIdentNumberAsync(string identNumber, int userId)
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

            return _mapper.Map<IEnumerable<BoardListInfo>>(boardLists);
        }

        public async Task<BoardListInfo> CreateAsync(CreateBoardListRequest request)
        {
            var boardList = new BoardList
            {
                Title = request.Title.Trim(),
                CreatedAt = DateTime.Now,
                BoardId = request.BoardId,
            };

            var created = await _boardListRepo.CreateAsync(boardList);
            return _mapper.Map<BoardListInfo>(created);
        }

        public async Task<BoardListInfo> GetByIdAsync(int id)
        {
            var boardList = await _boardListRepo.GetByIdAsync(id);

            if (boardList == null)
            {
                throw new NotFoundException("Board's list not found");
            }

            return _mapper.Map<BoardListInfo>(boardList);
        }
    }
}
