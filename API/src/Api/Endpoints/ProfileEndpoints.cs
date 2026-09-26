using System.Security.Claims;
using OppositeTalk.Application.Profiles;

namespace OppositeTalk.Api.Endpoints;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/profile").WithTags("User Profile");

        group.MapGet("/me", async (HttpContext context, ProfileService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!Guid.TryParse(userIdClaim, out var userId))
                return Results.Unauthorized();

            var res = await service.GetProfileByUserIdAsync(userId);
            return res.Success ? Results.Ok(res) : Results.NotFound(res);
        });

        group.MapPut("/me", async (UpdateProfileRequest req, HttpContext context, ProfileService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.UpdateProfileAsync(userId, req);
            return Results.Ok(res);
        });
    }
}
