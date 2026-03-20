using System.ComponentModel.DataAnnotations;

namespace Common.Models.Auth
{
    public record LoginRequest(
        [Required] string Email,
        [Required] string Password
    );
}
