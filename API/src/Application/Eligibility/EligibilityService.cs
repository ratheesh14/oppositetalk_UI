using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Domain.Enums;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Eligibility;

public record OptionDto(Guid Id, string Text, string? Subtext, bool IsMandatoryDisqualifier);
public record QuestionDto(Guid Id, string Section, string QuestionText, string? Description, bool IsMandatory, List<OptionDto> Options);
public record AssessmentVersionDto(string VersionId, DateTime UpdatedAt, List<QuestionDto> Questions);
public record SubmitAnswersRequest(Dictionary<string, string> Answers);
public record EligibilityResultDto(bool Eligible, int AssessmentVersion, int Score, bool MandatoryPassed, List<string> FailedRules, Dictionary<string, int> Dimensions);

public class EligibilityRuleEngine
{
    public static EligibilityResultDto Evaluate(Dictionary<string, string> userAnswers, List<EligibilityQuestion> questions)
    {
        var failedRules = new List<string>();
        bool isDisqualified = false;

        foreach (var (qIdStr, optIdStr) in userAnswers)
        {
            if (!Guid.TryParse(qIdStr, out var qId) || !Guid.TryParse(optIdStr, out var optId))
                continue;

            var question = questions.FirstOrDefault(q => q.Id == qId);
            var option = question?.Options.FirstOrDefault(o => o.Id == optId);

            if (option != null && option.IsMandatoryDisqualifier)
            {
                isDisqualified = true;
                failedRules.Add($"Responses indicate relationship intentions outside the core platform criteria for section '{question?.Section}'.");
            }
        }

        bool eligible = !isDisqualified;

        return new EligibilityResultDto(
            Eligible: eligible,
            AssessmentVersion: 1,
            Score: eligible ? 92 : 35,
            MandatoryPassed: eligible,
            FailedRules: failedRules,
            Dimensions: new Dictionary<string, int>
            {
                ["family"] = eligible ? 90 : 40,
                ["finance"] = eligible ? 85 : 50,
                ["lifestyle"] = eligible ? 88 : 45,
                ["relationship"] = eligible ? 94 : 30
            }
        );
    }
}

public class EligibilityService
{
    private readonly IApplicationDbContext _db;

    public EligibilityService(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<AssessmentVersionDto>> GetQuestionsAsync()
    {
        var questions = await _db.EligibilityQuestions
            .Include(q => q.Options)
            .Where(q => !q.IsDeleted)
            .ToListAsync();

        var qDtos = questions.Select(q => new QuestionDto(
            q.Id, q.Section, q.QuestionText, q.Description, q.IsMandatory,
            q.Options.Select(o => new OptionDto(o.Id, o.Text, o.Subtext, o.IsMandatoryDisqualifier)).ToList()
        )).ToList();

        return ApiResponse<AssessmentVersionDto>.Ok(new AssessmentVersionDto("v1.0", DateTime.UtcNow, qDtos));
    }

    public async Task<ApiResponse<EligibilityResultDto>> SubmitAssessmentAsync(Guid userId, SubmitAnswersRequest request)
    {
        var questions = await _db.EligibilityQuestions
            .Include(q => q.Options)
            .ToListAsync();

        var result = EligibilityRuleEngine.Evaluate(request.Answers, questions);

        var assessment = new EligibilityAssessment
        {
            UserId = userId,
            IsEligible = result.Eligible,
            AssessmentVersion = "1.0",
            AnswersJson = JsonSerializer.Serialize(request.Answers),
            ReasonsJson = JsonSerializer.Serialize(result.FailedRules)
        };

        _db.EligibilityAssessments.Add(assessment);

        var user = await _db.Users.FindAsync(userId);
        if (user != null)
        {
            user.IsEligible = result.Eligible;
        }

        await _db.SaveChangesAsync();

        return ApiResponse<EligibilityResultDto>.Ok(result);
    }
}
