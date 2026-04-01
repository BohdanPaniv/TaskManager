using AutoMapper;
using Serilog;
using WebApi.Extensions;
using WebApi.Middleware;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddControllers();
    builder.Services.AddApplicationServices(builder.Configuration);
    builder.Services.AddJwtAuthentication(builder.Configuration);
    builder.Services.AddCorsPolicy(builder.Configuration); 
    builder.Services.AddValidationResponse();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerDocs();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwaggerDocs();
        app.MigrateDatabase();
    }

    app.UseMiddleware<ExceptionMiddleware>();
    app.UseCors("AllowAngular");
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.MapHealthChecks("/health");
    var mapper = app.Services.GetRequiredService<IMapper>();
    mapper.ConfigurationProvider.AssertConfigurationIsValid();

    app.Run();
}
catch (HostAbortedException)
{

}
catch (Exception ex)
{
    Log.Fatal(ex, "API failed to start");
}
finally
{
    Log.CloseAndFlush();
}