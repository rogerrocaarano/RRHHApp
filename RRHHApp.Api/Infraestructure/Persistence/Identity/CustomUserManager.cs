using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Entities.Enums;
using RRHHApp.Api.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RRHHApp.Api.Infraestructure.Persistence.Identity;

public class CustomUserManager : UserManager<User>, IUsersRepository
{
    public CustomUserManager(
        IUserStore<User> store,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<User> passwordHasher,
        IEnumerable<IUserValidator<User>> userValidators,
        IEnumerable<IPasswordValidator<User>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<UserManager<User>> logger)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors,
            services, logger)
    {
    }

    public override async Task<IdentityResult> CreateAsync(User user, string password)
    {
        var result = await base.CreateAsync(user, password);

        if (result.Succeeded)
        {
            var defaultRole = RoleNames.Candidate.ToString();
            await AddToRoleAsync(user, defaultRole);
        }

        return result;
    }

    public async Task AddUserToRole(User user, string role)
    {
        await AddToRoleAsync(user, role);
    }

    public async Task RemoveUserFromRole(User user, string role)
    {
        await RemoveFromRoleAsync(user, role);
    }

    public async Task<List<string>> GetUserRoles(User user)
    {
        var userRoles = await GetRolesAsync(user);
        return userRoles.ToList();
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await FindByEmailAsync(email);
    }

    public async Task<User?> GetUserById(string id)
    {
        return await FindByIdAsync(id);
    }
}