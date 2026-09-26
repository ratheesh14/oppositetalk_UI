using System.Security.Claims;
using OppositeTalk.Application.Eligibility;

namespace OppositeTalk.Api.Endpoints;

public static class EligibilityEndpoints
{
    public static void MapEligibilityEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/eligibility").WithTags("Eligibility Engine");

        group.MapGet("/questions", async (EligibilityService service) =>
        {
            var res = await service.GetQuestionsAsync();
            return Results.Ok(res);
        });

        group.MapPost("/assessments/submit", async (SubmitAnswersRequest req, HttpContext context, EligibilityService service) =>
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.TryParse(userIdClaim, out var id) ? id : Guid.NewGuid();

            var res = await service.SubmitAssessmentAsync(userId, req);
            return Results.Ok(res);
        });
    }
}
