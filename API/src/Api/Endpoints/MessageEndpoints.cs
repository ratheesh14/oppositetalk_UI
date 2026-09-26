using System.Security.Claims;
using OppositeTalk.Application.Messages;

namespace OppositeTalk.Api.Endpoints;

public static class MessageEndpoints
{
    public static void MapMessageEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/messages").WithTags("Messaging & SignalR");

        group.MapGet("/conversations", async (HttpContext context, MessageService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.GetUserConversationsAsync(userId);
            return Results.Ok(res);
        });

        group.MapPost("/{conversationId:guid}", async (Guid conversationId, SendMessageRequest req, HttpContext context, MessageService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var senderId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.SendMessageAsync(conversationId, senderId, req);
            return Results.Ok(res);
        });
    }
}
