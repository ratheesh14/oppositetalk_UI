using System.Security.Claims;
using OppositeTalk.Application.Matching;

namespace OppositeTalk.Api.Endpoints;

public static class MatchingEndpoints
{
    public static void MapMatchingEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1").WithTags("Discovery & Matching");

        group.MapGet("/discover", async (HttpContext context, MatchingService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.DiscoverCandidatesAsync(userId);
            return Results.Ok(res);
        });

        group.MapPost("/users/{targetUserId:guid}/like", async (Guid targetUserId, HttpContext context, MatchingService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var likerUserId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.ExpressInterestAsync(likerUserId, targetUserId);
            return Results.Ok(res);
        });
    }
}
