namespace Common.Models.Tasks
{
    public record TaskDto(
        int Id,
        string Title,
        string Description,
        bool IsCompleted,
        DateTime CreatedAt,
        string Status
    );
}
