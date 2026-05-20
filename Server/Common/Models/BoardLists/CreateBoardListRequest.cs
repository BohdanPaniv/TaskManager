using System.ComponentModel.DataAnnotations;

namespace Common.Models.BoardLists
{
    public record CreateBoardListRequest(
        [Required][MaxLength(200)] string Title,
        int BoardId
    );
}
