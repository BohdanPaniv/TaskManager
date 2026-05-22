using System.ComponentModel.DataAnnotations;

namespace Common.Models.Tasks
{
    public record MoveTaskRequest(
        [Required] int BoardListId
    );
}
