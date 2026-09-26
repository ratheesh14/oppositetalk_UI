using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Application.Profiles;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Matching;

public record LikeResponseDto(bool IsMutualMatch, Guid? MatchId, List<string> SharedFactors);
public record MatchDto(Guid MatchId, UserProfileDto MatchedProfile, int Score, List<string> SharedFactors);

public class MatchingService
{
    private readonly IApplicationDbContext _db;
    private readonly IAiClientService _ai;

    public MatchingService(IApplicationDbContext db, IAiClientService ai)
    {
        _db = db;
        _ai = ai;
    }

    public async Task<ApiResponse<List<UserProfileDto>>> DiscoverCandidatesAsync(Guid userId, int minAge = 18, int maxAge = 60)
    {
        // 1. Hard filters in .NET before AI
        var candidates = await _db.UserProfiles
            .Include(p => p.Photos)
            .Where(p => p.UserId != userId && p.Age >= minAge && p.Age <= maxAge && !p.IsDeleted)
            .Take(20)
            .ToListAsync();

        var dtos = candidates.Select(p => new UserProfileDto(
            p.Id, p.UserId, p.DisplayName, p.Age, p.Gender, p.Location, p.Bio,
            p.DegreeLevel, p.FieldOfStudy, p.Institution,
            p.ProfessionTitle, p.Industry, p.WorkStyle,
            p.SmokingPreference, p.DrinkingPreference, p.FitnessRoutine,
            p.TimelineToMarriage, p.RelationshipType,
            p.WantsChildren, p.CurrentChildrenCount, p.FamilyValuesDescription,
            p.FinancialStyle, p.BudgetingApproach,
            p.Photos.Select(ph => new PhotoDto(ph.Id, ph.Url, ph.IsMain, ph.Caption)).ToList()
        )).ToList();

        return ApiResponse<List<UserProfileDto>>.Ok(dtos);
    }

    public async Task<ApiResponse<LikeResponseDto>> ExpressInterestAsync(Guid likerUserId, Guid targetUserId)
    {
        var existingLike = await _db.Likes.FirstOrDefaultAsync(l => l.LikerUserId == likerUserId && l.LikedUserId == targetUserId);
        if (existingLike == null)
        {
            _db.Likes.Add(new Like { LikerUserId = likerUserId, LikedUserId = targetUserId });
            await _db.SaveChangesAsync();
        }

        // Check if mutual interest exists
        var reciprocalLike = await _db.Likes.FirstOrDefaultAsync(l => l.LikerUserId == targetUserId && l.LikedUserId == likerUserId);

        if (reciprocalLike != null)
        {
            // Call internal FastAPI AI service for explainable compatibility analysis
            var aiAnalysis = await _ai.AnalyzeMatchingAsync(likerUserId, targetUserId);

            var match = new Match
            {
                User1Id = likerUserId,
                User2Id = targetUserId,
                CompatibilityScore = (int)(aiAnalysis.CompatibilityScore * 100),
                SharedFactorsJson = System.Text.Json.JsonSerializer.Serialize(aiAnalysis.PositiveFactors)
            };

            _db.Matches.Add(match);

            // Create initial Conversation
            _db.Conversations.Add(new Conversation { User1Id = likerUserId, User2Id = targetUserId });

            await _db.SaveChangesAsync();

            return ApiResponse<LikeResponseDto>.Ok(new LikeResponseDto(true, match.Id, aiAnalysis.PositiveFactors));
        }

        return ApiResponse<LikeResponseDto>.Ok(new LikeResponseDto(false, null, new()));
    }
}
