using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Domain.Repositories;

public interface IUsersRepository
{
    Task AddUserToRole(User user, string role);
    Task RemoveUserFromRole(User user, string role);
    Task<List<string>> GetUserRoles(User user);
}