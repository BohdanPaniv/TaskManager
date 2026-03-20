using System.ComponentModel.DataAnnotations;

namespace Common.Models.Auth
{
    public record RegisterRequest(
        [Required] string Email,
        [Required][MinLength(6)] string Password
    );
}
