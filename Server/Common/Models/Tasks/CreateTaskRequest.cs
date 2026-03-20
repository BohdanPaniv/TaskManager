using System.ComponentModel.DataAnnotations;

namespace Common.Models.Tasks
{
    public record CreateTaskRequest(
        [Required][MaxLength(200)] string Title,
        [MaxLength(2000)] string Description
    );
}
