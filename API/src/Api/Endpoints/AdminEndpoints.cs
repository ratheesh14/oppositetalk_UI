using OppositeTalk.Application.Admin;

namespace OppositeTalk.Api.Endpoints;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/admin").WithTags("Admin Control Hub");

        group.MapGet("/stats", async (AdminService service) =>
        {
            var res = await service.GetDashboardStatsAsync();
            return Results.Ok(res);
        });
    }
}
