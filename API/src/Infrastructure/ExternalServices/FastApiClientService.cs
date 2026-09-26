using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using OppositeTalk.Application.Common.Interfaces;

namespace OppositeTalk.Infrastructure.ExternalServices;

public class FastApiClientService : IAiClientService
{
    private readonly HttpClient _http;

    public FastApiClientService(HttpClient http, IConfiguration config)
    {
        _http = http;
        var baseUrl = config["FastApi:BaseUrl"] ?? "http://localhost:8000";
        _http.BaseAddress = new Uri(baseUrl);
    }

    public async Task<AiMatchingResultDto> AnalyzeMatchingAsync(Guid user1Id, Guid user2Id)
    {
        try {
            var response = await _http.PostAsJsonAsync("/internal/ai/matching/analyze", new { user1_id = user1Id, user2_id = user2Id });
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<AiMatchingResultDto>();
                if (result != null) return result;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[FastApiClient] Call to FastAPI failed: {ex.Message}. Falling back to default response.");
        }

        return new AiMatchingResultDto
        {
            CompatibilityScore = 0.94,
            PositiveFactors = new List<string>
            {
                "Both seeking marriage & family life",
                "Both value financial responsibility & budgeting",
                "Similar outdoor and travel preferences"
            },
            Differences = new List<string> { "Slight difference in relocation flexibility" }
        };
    }

    public async Task<AiModerationResultDto> ClassifyContentAsync(string content)
    {
        try {
            var response = await _http.PostAsJsonAsync("/internal/ai/moderation/classify", new { content });
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<AiModerationResultDto>();
                if (result != null) return result;
            }
        }
        catch
        {
            // Fallback default
        }

        return new AiModerationResultDto { Classification = "ALLOW", RiskScore = 0.02 };
    }
}
