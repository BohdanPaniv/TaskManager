using AppModels.Models;
using AutoMapper;
using Common.Models.BoardLists;

namespace BusinessLogic.Mapping
{
    public class BoardListProfile : Profile
    {
        public BoardListProfile()
        {
            CreateMap<BoardList, BoardListInfo>();
        }
    }
}
