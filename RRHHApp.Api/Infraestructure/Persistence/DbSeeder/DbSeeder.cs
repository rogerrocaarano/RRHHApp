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
        foreach (var role in Enum.GetNames(typeof(RoleNames)))
        {
            if (!await VerifyRole(role))
            {
                await CreateRole(role);
            }
        }
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
        await _userManager.ConfirmEmailAsync(adminUser, await _userManager.GenerateEmailConfirmationTokenAsync(adminUser));
    }
}