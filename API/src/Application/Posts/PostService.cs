using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Posts;

public record PostDto(Guid Id, Guid AuthorId, string AuthorName, string? CommunityName, string Content, string? ImageUrl, int LikesCount, int CommentsCount, DateTime CreatedAt);
public record CreatePostRequest(string Content, string? CommunityName, string? ImageUrl);

public class PostService
{
    private readonly IApplicationDbContext _db;

    public PostService(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<List<PostDto>>> GetFeedAsync()
    {
        var posts = await _db.Posts
            .Where(p => !p.IsDeleted)
            .OrderByDescending(p => p.CreatedAt)
            .Take(30)
            .ToListAsync();

        var dtos = posts.Select(p => new PostDto(
            p.Id, p.AuthorId, p.AuthorName, p.CommunityName, p.Content, p.ImageUrl, p.LikesCount, p.CommentsCount, p.CreatedAt
        )).ToList();

        return ApiResponse<List<PostDto>>.Ok(dtos);
    }

    public async Task<ApiResponse<PostDto>> CreatePostAsync(Guid userId, CreatePostRequest req)
    {
        var user = await _db.Users.FindAsync(userId);
        var post = new Post
        {
            AuthorId = userId,
            AuthorName = user != null ? $"{user.FirstName} {user.LastName}" : "Member",
            CommunityName = req.CommunityName,
            Content = req.Content,
            ImageUrl = req.ImageUrl
        };

        _db.Posts.Add(post);
        await _db.SaveChangesAsync();

        return ApiResponse<PostDto>.Ok(new PostDto(
            post.Id, post.AuthorId, post.AuthorName, post.CommunityName, post.Content, post.ImageUrl, post.LikesCount, post.CommentsCount, post.CreatedAt
        ));
    }
}
