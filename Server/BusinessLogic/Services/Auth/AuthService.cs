using AppModels.Models;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces.Auth;
using Common.Models.Auth;
using DataAccess.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace BusinessLogic.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            IUserRepository userRepo,
            ITokenService tokenService,
            ILogger<AuthService> logger)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            if (request.Password != request.ConfirmPassword)
            {
                throw new ValidationException("Passwords do not match");
            }

            var email = request.Email.Trim().ToLower();

            if (await _userRepo.ExistsAsync(email))
            {
                _logger.LogWarning("Registration failed — email already in use: {Email}", email);
                throw new ValidationException("Email already in use");
            }

            var user = new User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            var created = await _userRepo.CreateAsync(user);
            _logger.LogInformation("New user registered: {Email}", created.Email);

            var token = _tokenService.GenerateToken(created);
            return new AuthResponse(token, created.Email, created.Id);
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var email = request.Email.Trim().ToLower();
            var user = await _userRepo.GetByEmailAsync(email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                _logger.LogWarning("Failed login attempt for {Email}", email);
                throw new UnauthorizedException("Invalid credentials");
            }

            _logger.LogInformation("User logged in: {Email}", user.Email);

            var token = _tokenService.GenerateToken(user);
            return new AuthResponse(token, user.Email, user.Id);
        }
    }
}
