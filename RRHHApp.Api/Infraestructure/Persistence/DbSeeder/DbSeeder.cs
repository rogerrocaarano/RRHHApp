using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Infraestructure.Persistence.EF;
using RRHHApp.Api.Domain.Entities.Enums;

namespace RRHHApp.Api.Infraestructure.Persistence.DbSeeder;

public class DbSeeder(
    IOptions<DbSeederSettings> dbSeederSettingsOptions,
    AppDbContext context,
    UserManager<User> userManager,
    RoleManager<UserRole> roleManager
) : IDbSeeder
{
    private readonly DbSeederSettings _dbSeederSettings = dbSeederSettingsOptions.Value;
    private readonly AppDbContext _context = context;
    private readonly UserManager<User> _userManager = userManager;
    private readonly RoleManager<UserRole> _roleManager = roleManager;

    public async Task SeedRoles()
    {
        if (_context.AppState.Any(s => s.Parameter == "RolesSeeded"))
        {
            Console.WriteLine("Roles already seeded");
            return;
        }
        foreach (var role in Enum.GetNames(typeof(RoleNames)))
        {
            if (!await VerifyRole(role))
            {
                await CreateRole(role);
            }
        }

        var appState = new AppState
        {
            Id = Guid.NewGuid(),
            Parameter = "RolesSeeded",
            Status = true
        };
        await _context.AppState.AddAsync(appState);
    }

    public async Task MigrateDatabase()
    {
        await _context.Database.MigrateAsync();
    }

    private async Task<bool> VerifyRole(string roleName)
    {
        return await _roleManager.RoleExistsAsync(roleName);
    }

    private async Task CreateRole(string roleName)
    {
        var role = new UserRole
        {
            Name = roleName
        };
        await _roleManager.CreateAsync(role);
        Console.WriteLine($"Role {roleName} created");
    }

    public async Task AddRoleToAdminUser()
    {
        var adminUser = await _userManager.FindByEmailAsync(_dbSeederSettings.AdminUser);
        if (adminUser == null)
        {
            Console.WriteLine("Admin user not found");
            return;
        }

        if (await _userManager.IsInRoleAsync(adminUser, RoleNames.Admin.ToString()))
        {
            Console.WriteLine("Admin user already has Admin role");
            return;
        }

        Console.WriteLine("Adding Admin role to Admin user");
        await _userManager.AddToRoleAsync(adminUser, RoleNames.Admin.ToString());
        await _userManager.ConfirmEmailAsync(adminUser,
            await _userManager.GenerateEmailConfirmationTokenAsync(adminUser));
    }

    public async Task SeedTestUsers()
    {
        if (_context.AppState.Any(s => s.Parameter == "TestUsersSeeded"))
        {
            Console.WriteLine("Test users already seeded");
            return;
        }
        await SeedAdminUser();
        await SeedDirectorUser();
        await SeedRecruiterUser();
        var appState = new AppState
        {
            Id = Guid.NewGuid(),
            Parameter = "TestUsers",
            Status = true
        };
        await _context.AppState.AddAsync(appState);
    }

    private async Task SeedAdminUser()
    {
        var adminUser = new User
        {
            UserName = "admin",
            Email = "admin@example.com"
        };
        var result = await _userManager.CreateAsync(adminUser, "Admin1234!");
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(adminUser, RoleNames.Admin.ToString());
            var confirmationEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(adminUser);
            await _userManager.ConfirmEmailAsync(adminUser, confirmationEmailToken);
            Console.WriteLine("Admin user created");
        }
        else
        {
            Console.WriteLine("Admin user not created");
        }
    }

    private async Task SeedDirectorUser()
    {
        var directorUser = new User
        {
            UserName = "director",
            Email = "director@example.com"
        };
        var result = await _userManager.CreateAsync(directorUser, "Director1234!");
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(directorUser, RoleNames.Director.ToString());
            var confirmationEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(directorUser);
            await _userManager.ConfirmEmailAsync(directorUser, confirmationEmailToken);
            Console.WriteLine("Director user created");
        }
        else
        {
            Console.WriteLine("Director user not created");
        }
    }

    private async Task SeedRecruiterUser()
    {
        var recruiterUser = new User
        {
            UserName = "recruiter",
            Email = "recruiter@example.com"
        };
        var result = await _userManager.CreateAsync(recruiterUser, "Recruiter1234!");
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(recruiterUser, RoleNames.Recruiter.ToString());
            var confirmationEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(recruiterUser);
            await _userManager.ConfirmEmailAsync(recruiterUser, confirmationEmailToken);
            Console.WriteLine("Recruiter user created");
        }
        else
        {
            Console.WriteLine("Recruiter user not created");
        }
    }
}