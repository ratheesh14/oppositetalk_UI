using Microsoft.EntityFrameworkCore;
using OppositeTalk.Domain.Entities;

namespace OppositeTalk.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<UserProfile> UserProfiles { get; }
    DbSet<Photo> Photos { get; }
    DbSet<EligibilityQuestion> EligibilityQuestions { get; }
    DbSet<EligibilityOption> EligibilityOptions { get; }
    DbSet<EligibilityRule> EligibilityRules { get; }
    DbSet<EligibilityAssessment> EligibilityAssessments { get; }
    DbSet<Like> Likes { get; }
    DbSet<Match> Matches { get; }
    DbSet<Conversation> Conversations { get; }
    DbSet<Message> Messages { get; }
    DbSet<Post> Posts { get; }
    DbSet<Comment> Comments { get; }
    DbSet<Community> Communities { get; }
    DbSet<Report> Reports { get; }
    DbSet<AuditLog> AuditLogs { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

public interface ICacheService
{
    Task<T?> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null);
    Task RemoveAsync(string key);
}

public interface IJwtTokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}

public interface IAiClientService
{
    Task<AiMatchingResultDto> AnalyzeMatchingAsync(Guid user1Id, Guid user2Id);
    Task<AiModerationResultDto> ClassifyContentAsync(string content);
}

public class AiMatchingResultDto
{
    public double CompatibilityScore { get; set; } = 0.85;
    public List<string> PositiveFactors { get; set; } = new();
    public List<string> Differences { get; set; } = new();
}

public class AiModerationResultDto
{
    public string Classification { get; set; } = "ALLOW";
    public double RiskScore { get; set; } = 0.05;
}
