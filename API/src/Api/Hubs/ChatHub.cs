using Microsoft.AspNetCore.SignalR;

namespace OppositeTalk.Api.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string conversationId, string content, string? imageUrl)
    {
        var senderId = Context.UserIdentifier ?? "anonymous";
        await Clients.Group(conversationId).SendAsync("ReceiveMessage", new
        {
            conversationId,
            senderId,
            content,
            imageUrl,
            createdAt = DateTime.UtcNow
        });
    }

    public async Task SendTypingNotification(string conversationId, bool isTyping)
    {
        var userId = Context.UserIdentifier ?? "anonymous";
        await Clients.OthersInGroup(conversationId).SendAsync("UserTyping", new
        {
            conversationId,
            userId,
            isTyping
        });
    }

    public async Task JoinConversation(string conversationId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);
    }
}
