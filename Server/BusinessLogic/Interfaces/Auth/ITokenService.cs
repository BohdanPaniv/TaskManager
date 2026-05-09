using AppModels.Models;

namespace BusinessLogic.Interfaces.Auth
{
    public interface ITokenService : IService
    {
        string GenerateToken(User user);
    }
}
