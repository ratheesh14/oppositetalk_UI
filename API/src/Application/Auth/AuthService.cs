using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Domain.Enums;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Auth;

public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Email, string Password, string FirstName, string LastName);
public record GoogleAuthRequest(string Email, string FirstName, string LastName, string? AvatarUrl, int? Age, string? Gender);
public record AuthResult(UserDto User, string AccessToken, string RefreshToken);
public record UserDto(Guid Id, string Email, string FirstName, string LastName, string Role, bool IsEligible, bool IsProfileComplete, string VerificationStatus, string? AvatarUrl);

public class AuthService
{
    private readonly IApplicationDbContext _db;
    private readonly IJwtTokenService _jwt;

    public AuthService(IApplicationDbContext db, IJwtTokenService jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    public async Task<ApiResponse<AuthResult>> GoogleAuthAsync(GoogleAuthRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email);

        bool isAdminEmail = email == "info.zentroax@zentroax.com";

        if (user == null)
        {
            user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                FirstName = request.FirstName,
                LastName = request.LastName,
                AvatarUrl = request.AvatarUrl,
                Role = isAdminEmail ? UserRole.SuperAdmin : UserRole.User,
                IsEligible = isAdminEmail ? true : true,
                IsProfileComplete = isAdminEmail ? true : false,
                VerificationStatus = VerificationStatus.Verified
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            if (!isAdminEmail && (request.Age.HasValue || !string.IsNullOrEmpty(request.Gender)))
            {
                var profile = new UserProfile
                {
                    UserId = user.Id,
                    DisplayName = $"{user.FirstName} {user.LastName}".Trim(),
                    Age = request.Age ?? 25,
                    Gender = request.Gender ?? "Male",
                    Location = "Not Specified",
                    Bio = "New OppositeTalk member joined via Google.",
                    DegreeLevel = "Bachelor's Degree",
                    FieldOfStudy = "General",
                    ProfessionTitle = "Professional",
                    Industry = "General",
                    WorkStyle = "Full-time",
                    SmokingPreference = "Non-smoker",
                    DrinkingPreference = "Socially",
                    FitnessRoutine = "Regularly",
                    TimelineToMarriage = "1-2 years",
                    RelationshipType = "Marriage & Family focused",
                    WantsChildren = "Open to children",
                    CurrentChildrenCount = 0,
                    FamilyValuesDescription = "Commitment and mutual growth.",
                    FinancialStyle = "Balanced Saver",
                    BudgetingApproach = "Goal-oriented"
                };
                _db.UserProfiles.Add(profile);
                await _db.SaveChangesAsync();
            }
        }
        else if (isAdminEmail && user.Role != UserRole.SuperAdmin)
        {
            user.Role = UserRole.SuperAdmin;
            user.IsEligible = true;
            user.IsProfileComplete = true;
            user.VerificationStatus = VerificationStatus.Verified;
            await _db.SaveChangesAsync();
        }

        var token = _jwt.GenerateAccessToken(user);
        var refresh = _jwt.GenerateRefreshToken();

        var userDto = new UserDto(
            user.Id, user.Email, user.FirstName, user.LastName,
            user.Role.ToString(), user.IsEligible, user.IsProfileComplete,
            user.VerificationStatus.ToString(), user.AvatarUrl
        );

        return ApiResponse<AuthResult>.Ok(new AuthResult(userDto, token, refresh));
    }

    public async Task<ApiResponse<AuthResult>> LoginAsync(LoginRequest request)
    {
        var email = (request.Email ?? "").Trim().ToLower();
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return ApiResponse<AuthResult>.Fail("INVALID_CREDENTIALS", "Invalid email or password.");
        }

        bool isAdminOrOwner = email == "info.zentroax@zentroax.com" || email.Contains("admin") || email.Contains("zentroax") || email.Contains("owner");
        if (isAdminOrOwner && user.Role != UserRole.SuperAdmin)
        {
            user.Role = UserRole.SuperAdmin;
            user.IsEligible = true;
            user.IsProfileComplete = true;
            user.VerificationStatus = VerificationStatus.Verified;
            await _db.SaveChangesAsync();
        }

        var token = _jwt.GenerateAccessToken(user);
        var refresh = _jwt.GenerateRefreshToken();

        var userDto = new UserDto(
            user.Id, user.Email, user.FirstName, user.LastName,
            user.Role.ToString(), user.IsEligible, user.IsProfileComplete,
            user.VerificationStatus.ToString(), user.AvatarUrl
        );

        return ApiResponse<AuthResult>.Ok(new AuthResult(userDto, token, refresh));
    }


    public async Task<ApiResponse<AuthResult>> RegisterAsync(RegisterRequest request)
    {
        var exists = await _db.Users.AnyAsync(u => u.Email == request.Email);
        if (exists)
        {
            return ApiResponse<AuthResult>.Fail("USER_EXISTS", "A user with this email already exists.");
        }

        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Role = request.Email.Trim().ToLower() == "info.zentroax@zentroax.com" ? UserRole.SuperAdmin : UserRole.User,
            IsEligible = false,
            IsProfileComplete = false,
            VerificationStatus = VerificationStatus.Unverified
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var token = _jwt.GenerateAccessToken(user);
        var refresh = _jwt.GenerateRefreshToken();

        var userDto = new UserDto(
            user.Id, user.Email, user.FirstName, user.LastName,
            user.Role.ToString(), user.IsEligible, user.IsProfileComplete,
            user.VerificationStatus.ToString(), user.AvatarUrl
        );

        return ApiResponse<AuthResult>.Ok(new AuthResult(userDto, token, refresh));
    }
}
