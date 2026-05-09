using AppModels.Models;
using AutoMapper;
using Common.Models.Boards;

namespace BusinessLogic.Mapping
{
    public class BoardsProfile : Profile
    {
        public BoardsProfile()
        {
            CreateMap<Board, BoardDto>();
        }
    }
}
