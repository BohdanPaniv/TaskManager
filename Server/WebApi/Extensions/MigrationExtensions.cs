using DataAccess;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace WebApi.Extensions
{
    public static class MigrationExtensions
    {
        public static IApplicationBuilder MigrateDatabase(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var pendingMigrations = db.Database.GetPendingMigrations().ToList();

            if (pendingMigrations.Count > 0)
            {
                Log.Information("Applying {Count} pending migrations", pendingMigrations.Count);
                db.Database.Migrate();
                Log.Information("Migrations applied successfully");
            }

            return app;
        }
    }
}
