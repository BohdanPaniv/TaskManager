using AppModels.Models;
using AutoMapper;
using Common.Models.Boards;

namespace BusinessLogic.Mapping
{
    public class BoardProfile : Profile
    {
        public BoardProfile()
        {
            CreateMap<Board, BoardDto>();
        }
    }
}
