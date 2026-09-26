using System.Net;
using OppositeTalk.Shared;

namespace OppositeTalk.Api.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = ApiResponse<object>.Fail(
                "SERVER_ERROR",
                "An unexpected error occurred on the server.",
                new[] { ex.Message }
            );

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
