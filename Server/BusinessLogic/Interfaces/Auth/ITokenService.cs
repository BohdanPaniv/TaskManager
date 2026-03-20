using AppModels.Models;

namespace BusinessLogic.Interfaces.Auth
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
