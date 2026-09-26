using Microsoft.EntityFrameworkCore;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Domain.Entities;
using OppositeTalk.Domain.Enums;
using OppositeTalk.Shared;

namespace OppositeTalk.Application.Auth;

public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Email, string Password, string FirstName, string LastName);
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

    public async Task<ApiResponse<AuthResult>> LoginAsync(LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return ApiResponse<AuthResult>.Fail("INVALID_CREDENTIALS", "Invalid email or password.");
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
            Role = UserRole.User,
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
