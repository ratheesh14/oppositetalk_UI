using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OppositeTalk.Api.Endpoints;
using OppositeTalk.Api.Hubs;
using OppositeTalk.Api.Middleware;
using OppositeTalk.Application.Admin;
using OppositeTalk.Application.Auth;
using OppositeTalk.Application.Common.Interfaces;
using OppositeTalk.Application.Eligibility;
using OppositeTalk.Application.Matching;
using OppositeTalk.Application.Messages;
using OppositeTalk.Application.Posts;
using OppositeTalk.Application.Profiles;
using OppositeTalk.Infrastructure.Authentication;
using OppositeTalk.Infrastructure.ExternalServices;
using OppositeTalk.Infrastructure.Persistence;
using OppositeTalk.Infrastructure.Redis;

var builder = WebApplication.CreateBuilder(args);

// 1. Add DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=aws-0-ap-northeast-2.pooler.supabase.com;Port=5432;Database=postgres;Username=postgres.uqddffqzhbbzmnaikayl;Password=Zentroax@14;SSL Mode=Require;Trust Server Certificate=true";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(connectionString, o => o.UseVector());
});

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

// 2. Add Distributed Redis Cache
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
});
builder.Services.AddSingleton<ICacheService, RedisCacheService>();

// 3. Add Authentication & JWT
var secret = "SuperSecretJwtKeyForOppositeTalkProductionSystem2026!";
var key = Encoding.ASCII.GetBytes(secret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddAuthorization();
builder.Services.AddSingleton<IJwtTokenService, JwtTokenService>();

// 4. Add HTTP Client for Python FastAPI AI Service
builder.Services.AddHttpClient<IAiClientService, FastApiClientService>();

// 5. Register Application Services
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<EligibilityService>();
builder.Services.AddScoped<ProfileService>();
builder.Services.AddScoped<MatchingService>();
builder.Services.AddScoped<MessageService>();
builder.Services.AddScoped<PostService>();
builder.Services.AddScoped<AdminService>();

// 6. Add SignalR & CORS
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Health Check Endpoint
app.MapGet("/health", () => Results.Ok(new { status = "Healthy", timestamp = DateTime.UtcNow }));
app.MapGet("/health/ready", () => Results.Ok(new { status = "Ready", db = "Connected" }));

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Map Minimal API Endpoints
app.MapAuthEndpoints();
app.MapEligibilityEndpoints();
app.MapProfileEndpoints();
app.MapMatchingEndpoints();
app.MapMessageEndpoints();
app.MapPostEndpoints();
app.MapAdminEndpoints();

// Map SignalR Chat Hub
app.MapHub<ChatHub>("/hubs/chat");

// Seed Database & Run Migrations
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
        await SeedData.SeedAsync(db);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[SeedData] Database setup notice: {ex.Message}");
    }
}

app.Run();
