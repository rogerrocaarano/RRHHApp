using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Domain.Repositories;

public interface IUserRolesRepository
{
    Task<UserRole> GetUserRoleByName(string roleName);
}