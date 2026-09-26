using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Profiles;

public record UpdateProfileRequest(
    string DisplayName, int Age, string Gender, string Location, string Bio,
    string DegreeLevel, string FieldOfStudy, string? Institution,
    string ProfessionTitle, string Industry, string WorkStyle,
    string SmokingPreference, string DrinkingPreference, string FitnessRoutine,
    string TimelineToMarriage, string RelationshipType,
    string WantsChildren, int CurrentChildrenCount, string FamilyValuesDescription,
    string FinancialStyle, string BudgetingApproach
);

public record UserProfileDto(
    Guid Id, Guid UserId, string DisplayName, int Age, string Gender, string Location, string Bio,
    string DegreeLevel, string FieldOfStudy, string? Institution,
    string ProfessionTitle, string Industry, string WorkStyle,
    string SmokingPreference, string DrinkingPreference, string FitnessRoutine,
    string TimelineToMarriage, string RelationshipType,
    string WantsChildren, int CurrentChildrenCount, string FamilyValuesDescription,
    string FinancialStyle, string BudgetingApproach,
    List<PhotoDto> Photos
);

public record PhotoDto(Guid Id, string Url, bool IsMain, string? Caption);

public class ProfileService
{
    private readonly IApplicationDbContext _db;

    public ProfileService(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<UserProfileDto>> GetProfileByUserIdAsync(Guid userId)
    {
        var profile = await _db.UserProfiles
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return ApiResponse<UserProfileDto>.Fail("PROFILE_NOT_FOUND", "Profile does not exist yet.");
        }

        return ApiResponse<UserProfileDto>.Ok(MapToDto(profile));
    }

    public async Task<ApiResponse<UserProfileDto>> UpdateProfileAsync(Guid userId, UpdateProfileRequest req)
    {
        var profile = await _db.UserProfiles
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            profile = new UserProfile { UserId = userId };
            _db.UserProfiles.Add(profile);
        }

        profile.DisplayName = req.DisplayName;
        profile.Age = req.Age;
        profile.Gender = req.Gender;
        profile.Location = req.Location;
        profile.Bio = req.Bio;
        profile.DegreeLevel = req.DegreeLevel;
        profile.FieldOfStudy = req.FieldOfStudy;
        profile.Institution = req.Institution;
        profile.ProfessionTitle = req.ProfessionTitle;
        profile.Industry = req.Industry;
        profile.WorkStyle = req.WorkStyle;
        profile.SmokingPreference = req.SmokingPreference;
        profile.DrinkingPreference = req.DrinkingPreference;
        profile.FitnessRoutine = req.FitnessRoutine;
        profile.TimelineToMarriage = req.TimelineToMarriage;
        profile.RelationshipType = req.RelationshipType;
        profile.WantsChildren = req.WantsChildren;
        profile.CurrentChildrenCount = req.CurrentChildrenCount;
        profile.FamilyValuesDescription = req.FamilyValuesDescription;
        profile.FinancialStyle = req.FinancialStyle;
        profile.BudgetingApproach = req.BudgetingApproach;

        var user = await _db.Users.FindAsync(userId);
        if (user != null)
        {
            user.IsProfileComplete = true;
        }

        await _db.SaveChangesAsync();

        return ApiResponse<UserProfileDto>.Ok(MapToDto(profile));
    }

    private static UserProfileDto MapToDto(UserProfile p) => new(
        p.Id, p.UserId, p.DisplayName, p.Age, p.Gender, p.Location, p.Bio,
        p.DegreeLevel, p.FieldOfStudy, p.Institution,
        p.ProfessionTitle, p.Industry, p.WorkStyle,
        p.SmokingPreference, p.DrinkingPreference, p.FitnessRoutine,
        p.TimelineToMarriage, p.RelationshipType,
        p.WantsChildren, p.CurrentChildrenCount, p.FamilyValuesDescription,
        p.FinancialStyle, p.BudgetingApproach,
        p.Photos.Select(ph => new PhotoDto(ph.Id, ph.Url, ph.IsMain, ph.Caption)).ToList()
    );
}
