using System.ComponentModel.DataAnnotations;

namespace Common.Models.Boards
{
    public record UpdateBoardRequest(
        [Required][MaxLength(200)] string Title
    );
}
