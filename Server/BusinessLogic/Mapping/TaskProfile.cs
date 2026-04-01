using AppModels.Models;
using AutoMapper;
using Common.Models.Tasks;

namespace BusinessLogic.Mapping
{
    public class TaskProfile : Profile
    {
        public TaskProfile()
        {
            CreateMap<TaskItem, TaskDto>();
        }
    }
}
