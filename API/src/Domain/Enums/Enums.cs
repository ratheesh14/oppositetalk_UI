namespace OppositeTalk.Domain.Enums;

public enum UserRole
{
    User = 1,
    Moderator = 2,
    Admin = 3,
    SuperAdmin = 4
}

public enum VerificationStatus
{
    Unverified = 0,
    Pending = 1,
    Verified = 2,
    Rejected = 3
}

public enum RuleAction
{
    Disqualify = 1,
    FlagForReview = 2
}

public enum ReportStatus
{
    Pending = 1,
    UnderReview = 2,
    Resolved = 3,
    Dismissed = 4
}

public enum ContentType
{
    Profile = 1,
    Message = 2,
    Post = 3,
    Comment = 4,
    Community = 5
}
