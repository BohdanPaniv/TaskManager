using Common.Models.Auth;

namespace BusinessLogic.Interfaces.Auth
{
    public interface IAuthService : IService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
    }
}
