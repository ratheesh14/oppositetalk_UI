using OppositeTalk.Application.Auth;

namespace OppositeTalk.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/auth").WithTags("Authentication");

        group.MapPost("/google", async (GoogleAuthRequest req, AuthService authService) =>
        {
            var res = await authService.GoogleAuthAsync(req);
            return res.Success ? Results.Ok(res) : Results.BadRequest(res);
        });

        group.MapPost("/login", async (LoginRequest req, AuthService authService) =>
        {
            var res = await authService.LoginAsync(req);
            return res.Success ? Results.Ok(res) : Results.BadRequest(res);
        });

        group.MapPost("/register", async (RegisterRequest req, AuthService authService) =>
        {
            var res = await authService.RegisterAsync(req);
            return res.Success ? Results.Ok(res) : Results.BadRequest(res);
        });
    }
}
