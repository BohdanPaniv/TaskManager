namespace Common.Models.Tasks
{
    public record TaskDto(
        int Id,
        string Title,
        string Description,
        DateTime CreatedAt,
        int BoardListId
    );
}
