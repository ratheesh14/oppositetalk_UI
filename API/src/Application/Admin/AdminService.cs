using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Admin;

public record AdminStatsDto(int TotalUsers, int EligibleUsersCount, int PendingVerifications, int ActiveReports, int TotalMatches, string SystemHealth);

public class AdminService
{
    private readonly IApplicationDbContext _db;

    public AdminService(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<AdminStatsDto>> GetDashboardStatsAsync()
    {
        var totalUsers = await _db.Users.CountAsync();
        var eligibleUsers = await _db.Users.CountAsync(u => u.IsEligible);
        var activeReports = await _db.Reports.CountAsync(r => r.Status == Domain.Enums.ReportStatus.Pending);
        var totalMatches = await _db.Matches.CountAsync();

        return ApiResponse<AdminStatsDto>.Ok(new AdminStatsDto(
            totalUsers, eligibleUsers, 12, activeReports, totalMatches, "Healthy"
        ));
    }
}
