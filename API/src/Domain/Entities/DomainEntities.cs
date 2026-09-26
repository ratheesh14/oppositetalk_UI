using OppositeTalk.Domain.Enums;

namespace OppositeTalk.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public UserRole Role { get; set; } = UserRole.User;
    public bool IsEligible { get; set; } = false;
    public bool IsProfileComplete { get; set; } = false;
    public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.Unverified;
    public string? AvatarUrl { get; set; }

    public UserProfile? Profile { get; set; }
}

public class UserProfile : BaseEntity
{
    public Guid UserId { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;

    public string DegreeLevel { get; set; } = string.Empty;
    public string FieldOfStudy { get; set; } = string.Empty;
    public string? Institution { get; set; }

    public string ProfessionTitle { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string WorkStyle { get; set; } = string.Empty;

    public string SmokingPreference { get; set; } = string.Empty;
    public string DrinkingPreference { get; set; } = string.Empty;
    public string FitnessRoutine { get; set; } = string.Empty;

    public string TimelineToMarriage { get; set; } = string.Empty;
    public string RelationshipType { get; set; } = string.Empty;

    public string WantsChildren { get; set; } = string.Empty;
    public int CurrentChildrenCount { get; set; }
    public string FamilyValuesDescription { get; set; } = string.Empty;

    public string FinancialStyle { get; set; } = string.Empty;
    public string BudgetingApproach { get; set; } = string.Empty;

    public List<Photo> Photos { get; set; } = new();
}

public class Photo : BaseEntity
{
    public Guid UserProfileId { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsMain { get; set; }
    public string? Caption { get; set; }
}

public class EligibilityQuestion : BaseEntity
{
    public string Section { get; set; } = string.Empty;
    public string QuestionText { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsMandatory { get; set; } = true;

    public List<EligibilityOption> Options { get; set; } = new();
}

public class EligibilityOption : BaseEntity
{
    public Guid QuestionId { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? Subtext { get; set; }
    public bool IsMandatoryDisqualifier { get; set; } = false;
}

public class EligibilityRule : BaseEntity
{
    public string RuleName { get; set; } = string.Empty;
    public string Section { get; set; } = string.Empty;
    public bool IsMandatory { get; set; } = true;
    public RuleAction ActionOnFail { get; set; } = RuleAction.Disqualify;
    public bool IsActive { get; set; } = true;
    public string Version { get; set; } = "1.0";
}

public class EligibilityAssessment : BaseEntity
{
    public Guid UserId { get; set; }
    public bool IsEligible { get; set; }
    public string AssessmentVersion { get; set; } = "1.0";
    public string AnswersJson { get; set; } = "{}";
    public string ReasonsJson { get; set; } = "[]";
}

public class Like : BaseEntity
{
    public Guid LikerUserId { get; set; }
    public Guid LikedUserId { get; set; }
}

public class Match : BaseEntity
{
    public Guid User1Id { get; set; }
    public Guid User2Id { get; set; }
    public int CompatibilityScore { get; set; } = 90;
    public string SharedFactorsJson { get; set; } = "[]";
}

public class Conversation : BaseEntity
{
    public Guid User1Id { get; set; }
    public Guid User2Id { get; set; }
    public List<Message> Messages { get; set; } = new();
}

public class Message : BaseEntity
{
    public Guid ConversationId { get; set; }
    public Guid SenderId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public bool IsRead { get; set; } = false;
}

public class Post : BaseEntity
{
    public Guid AuthorId { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public string? CommunityName { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public int LikesCount { get; set; } = 0;
    public int CommentsCount { get; set; } = 0;
}

public class Comment : BaseEntity
{
    public Guid PostId { get; set; }
    public Guid AuthorId { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

public class Community : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int MemberCount { get; set; } = 0;
}

public class Report : BaseEntity
{
    public Guid ReporterUserId { get; set; }
    public Guid ReportedUserId { get; set; }
    public ContentType ContentType { get; set; }
    public string TargetId { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string? Details { get; set; }
    public ReportStatus Status { get; set; } = ReportStatus.Pending;
}

public class AuditLog : BaseEntity
{
    public string Action { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string Details { get; set; } = string.Empty;
}
