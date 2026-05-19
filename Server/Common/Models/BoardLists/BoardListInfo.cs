using Common.Models.Tasks;

namespace Common.Models.BoardLists
{
    public record BoardListInfo(
        int Id,
        string Title,
        DateTime CreatedAt,
        int BoardId,
        List <TaskDto> Tasks
    );
}
