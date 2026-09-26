using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Messages;

public record MessageDto(Guid Id, Guid ConversationId, Guid SenderId, string SenderName, string Content, string? ImageUrl, bool IsRead, DateTime CreatedAt);
public record ConversationDto(Guid Id, Guid ParticipantId, string ParticipantName, string? ParticipantAvatar, MessageDto? LastMessage, int UnreadCount, DateTime UpdatedAt);
public record SendMessageRequest(string Content, string? ImageUrl);

public class MessageService
{
    private readonly IApplicationDbContext _db;

    public MessageService(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<List<ConversationDto>>> GetUserConversationsAsync(Guid userId)
    {
        var convs = await _db.Conversations
            .Include(c => c.Messages)
            .Where(c => c.User1Id == userId || c.User2Id == userId)
            .ToListAsync();

        var result = new List<ConversationDto>();

        foreach (var c in convs)
        {
            var otherUserId = c.User1Id == userId ? c.User2Id : c.User1Id;
            var otherUser = await _db.Users.FindAsync(otherUserId);
            var lastMsg = c.Messages.OrderByDescending(m => m.CreatedAt).FirstOrDefault();

            MessageDto? lastMsgDto = lastMsg != null
                ? new MessageDto(lastMsg.Id, lastMsg.ConversationId, lastMsg.SenderId, "Member", lastMsg.Content, lastMsg.ImageUrl, lastMsg.IsRead, lastMsg.CreatedAt)
                : null;

            result.Add(new ConversationDto(
                c.Id,
                otherUserId,
                otherUser != null ? $"{otherUser.FirstName} {otherUser.LastName}" : "Member",
                otherUser?.AvatarUrl,
                lastMsgDto,
                c.Messages.Count(m => m.SenderId != userId && !m.IsRead),
                c.UpdatedAt ?? c.CreatedAt
            ));
        }

        return ApiResponse<List<ConversationDto>>.Ok(result);
    }

    public async Task<ApiResponse<MessageDto>> SendMessageAsync(Guid conversationId, Guid senderId, SendMessageRequest req)
    {
        var msg = new Message
        {
            ConversationId = conversationId,
            SenderId = senderId,
            Content = req.Content,
            ImageUrl = req.ImageUrl,
            IsRead = false
        };

        _db.Messages.Add(msg);

        var conv = await _db.Conversations.FindAsync(conversationId);
        if (conv != null) conv.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        var sender = await _db.Users.FindAsync(senderId);

        return ApiResponse<MessageDto>.Ok(new MessageDto(
            msg.Id, msg.ConversationId, msg.SenderId,
            sender != null ? $"{sender.FirstName} {sender.LastName}" : "You",
            msg.Content, msg.ImageUrl, msg.IsRead, msg.CreatedAt
        ));
    }
}
