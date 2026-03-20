using BusinessLogic.Exceptions;
using Common.Extensions;
using Serilog;

namespace WebApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                Log.Warning("Not found: {Message}", ex.Message);
                context.Response.StatusCode = 404;
                await context.Response.WriteAsJsonAsync(
                    ApiResponse<object>.Fail(ex.Message));
            }
            catch (UnauthorizedException ex)
            {
                Log.Warning("Unauthorized: {Message}", ex.Message);
                context.Response.StatusCode = 403;
                await context.Response.WriteAsJsonAsync(
                    ApiResponse<object>.Fail(ex.Message));
            }
            catch (ValidationException ex)
            {
                Log.Warning("Validation: {Message}", ex.Message);
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(
                    ApiResponse<object>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Unhandled exception");
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(
                    ApiResponse<object>.Fail("Internal server error"));
            }
        }
    }
}
