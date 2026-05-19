using AppModels.Models;
using AutoMapper;
using Common.Models.Board;

namespace BusinessLogic.Mapping
{
    public class BoardProfile : Profile
    {
        public BoardProfile()
        {
            CreateMap<Board, BoardInfo>();
        }
    }
}
