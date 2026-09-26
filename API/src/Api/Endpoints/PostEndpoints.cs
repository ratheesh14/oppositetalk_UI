using System.Security.Claims;
using OppositeTalk.Application.Posts;

namespace OppositeTalk.Api.Endpoints;

public static class PostEndpoints
{
    public static void MapPostEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/posts").WithTags("Social Feed & Posts");

        group.MapGet("/feed", async (PostService service) =>
        {
            var res = await service.GetFeedAsync();
            return Results.Ok(res);
        });

        group.MapPost("/", async (CreatePostRequest req, HttpContext context, PostService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.CreatePostAsync(userId, req);
            return Results.Ok(res);
        });
    }
}
