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
        private readonly IBoardListRepository _listRepo;
        private readonly IMapper _mapper;

        public BoardListService(IBoardListRepository listRepo, IMapper mapper)
        {
            _listRepo = listRepo;
            _mapper = mapper;
        }
        public async Task<BoardListDto> GetByIdAsync(int userId, int listId)
        {
            var list = await _listRepo.GetByIdAsync(listId)
                ?? throw new NotFoundException("List not found");

            if (list.Board.UserId != userId)
                throw new UnauthorizedException("Access denied");

            return _mapper.Map<BoardListDto>(list);
        }

        public async Task<BoardListDto> CreateAsync(int userId, CreateBoardListRequest request)
        {
            var boardList = new BoardList
            {
                Title = request.Title.Trim(),
                CreatedAt = DateTime.Now,
            };

            var created = await _listRepo.CreateAsync(boardList);
            return _mapper.Map<BoardListDto>(created);
        }
    }
}
