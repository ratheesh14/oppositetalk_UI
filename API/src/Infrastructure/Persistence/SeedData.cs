using OppositeTalk.Domain.Entities;
using OppositeTalk.Domain.Enums;

namespace OppositeTalk.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedAsync(ApplicationDbContext db)
    {
        if (!db.Users.Any(u => u.Email == "info.zentroax@zentroax.com"))
        {
            var admin = new User
            {
                Email = "info.zentroax@zentroax.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("ZentroaxAdmin2026!"),
                FirstName = "Zentroax",
                LastName = "Admin",
                Role = UserRole.SuperAdmin,
                IsEligible = true,
                IsProfileComplete = true,
                VerificationStatus = VerificationStatus.Verified
            };
            db.Users.Add(admin);
            await db.SaveChangesAsync();
        }

        if (!db.Users.Any(u => u.Email == "alex.m@example.com"))
        {
            var demoUser = new User
            {
                Email = "alex.m@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                FirstName = "Alex",
                LastName = "Morgan",
                Role = UserRole.User,
                IsEligible = true,
                IsProfileComplete = true,
                VerificationStatus = VerificationStatus.Verified
            };
            db.Users.Add(demoUser);
            await db.SaveChangesAsync();

            var demoProfile = new UserProfile
            {
                UserId = demoUser.Id,
                DisplayName = "Alex Morgan",
                Age = 29,
                Gender = "Male",
                Location = "Chicago, IL",
                Bio = "Focused on personal growth, economic stability, and finding a partner to build a home and family.",
                DegreeLevel = "Master's Degree",
                FieldOfStudy = "Computer Science",
                ProfessionTitle = "Senior Software Engineer",
                Industry = "Technology",
                WorkStyle = "Hybrid",
                SmokingPreference = "Non-smoker",
                DrinkingPreference = "Socially",
                FitnessRoutine = "3-4 times a week",
                TimelineToMarriage = "1-2 years",
                RelationshipType = "Marriage & Family focused",
                WantsChildren = "Definitely want children",
                CurrentChildrenCount = 0,
                FamilyValuesDescription = "Stable, warm family environment centered on honesty and accountability.",
                FinancialStyle = "Disciplined Saver & Investor",
                BudgetingApproach = "Goal-oriented"
            };
            db.UserProfiles.Add(demoProfile);
        }

        if (!db.EligibilityQuestions.Any())
        {
            var q1 = new EligibilityQuestion
            {
                Section = "Basic eligibility",
                QuestionText = "Are you at least 18 years of age and legally eligible to enter into marriage/civil partnerships?",
                Description = "The platform is exclusively for consenting adults seeking long-term serious commitments.",
                IsMandatory = true,
                Options = new List<EligibilityOption>
                {
                    new() { Text = "Yes, I am an adult seeking serious relationship commitments", IsMandatoryDisqualifier = false },
                    new() { Text = "No, I am under 18 years of age", IsMandatoryDisqualifier = true }
                }
            };

            var q2 = new EligibilityQuestion
            {
                Section = "Relationship intentions",
                QuestionText = "Are you currently looking for a serious relationship that may lead to marriage or long-term family building?",
                IsMandatory = true,
                Options = new List<EligibilityOption>
                {
                    new() { Text = "Yes, I am seeking a partner for marriage and long-term family life", IsMandatoryDisqualifier = false },
                    new() { Text = "No, I am only interested in casual hookups or non-committed dating", IsMandatoryDisqualifier = true }
                }
            };

            db.EligibilityQuestions.AddRange(q1, q2);

            db.EligibilityRules.Add(new EligibilityRule
            {
                RuleName = "Mandatory Adult & Serious Intent Rule",
                Section = "Basic eligibility",
                IsMandatory = true,
                ActionOnFail = RuleAction.Disqualify,
                IsActive = true,
                Version = "1.0"
            });
        }

        await db.SaveChangesAsync();
    }
}
