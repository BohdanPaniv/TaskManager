using BusinessLogic.Interfaces;
using BusinessLogic.Mapping;
using DataAccess;
using DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebApi.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services, IConfiguration config)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<TaskProfile>();
                cfg.AddProfile<BoardListProfile>();
                cfg.AddProfile<BoardsProfile>();
            });
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    config.GetConnectionString("DefaultConnection"),
                    sql => sql.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null)
                ));

            services.Scan(scan => scan
                .FromApplicationDependencies()
                .AddClasses(c => c.AssignableTo<IRepository>())
                    .AsImplementedInterfaces()
                    .WithScopedLifetime()
                .AddClasses(c => c.AssignableTo<IService>())
                    .AsImplementedInterfaces()
                    .WithScopedLifetime()
            );

            services.AddHealthChecks()
            .AddDbContextCheck<AppDbContext>();

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
        {
            var secret = config["Jwt:Secret"];
            if (string.IsNullOrEmpty(secret))
                throw new InvalidOperationException("Jwt:Secret is not configured");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            return services;
        }

        public static IServiceCollection AddCorsPolicy(
            this IServiceCollection services, IConfiguration config)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                    policy.WithOrigins(config["AllowedOrigins"] ?? "http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            return services;
        }

        public static IServiceCollection AddValidationResponse(
            this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState
                        .Where(e => e.Value?.Errors.Count > 0)
                        .ToDictionary(
                            k => k.Key,
                            v => v.Value!.Errors.Select(e => e.ErrorMessage)
                        );
                    return new BadRequestObjectResult(new { errors });
                };
            });

            return services;
        }
    }
}
