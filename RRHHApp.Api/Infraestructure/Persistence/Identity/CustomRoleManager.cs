using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Infraestructure.Persistence.Identity
{
    public class CustomRoleManager : RoleManager<UserRole>, IUserRolesRepository
    {
        public CustomRoleManager(
            IRoleStore<UserRole> store,
            IEnumerable<IRoleValidator<UserRole>> roleValidators,
            ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors,
            ILogger<RoleManager<UserRole>> logger)
            : base(store, roleValidators, keyNormalizer, errors, logger)
        {
        }

        public async Task<UserRole> GetUserRoleByName(string roleName)
        {
            var role = await FindByNameAsync(roleName);
            return new UserRole
            {
                Id = role.Id,
                Name = role.Name
            };
        }
    }
}