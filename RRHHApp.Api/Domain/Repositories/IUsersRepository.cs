using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Entities.Enums;

namespace RRHHApp.Api.Domain.Repositories;

public interface IUsersRepository
{
    Task AddUserToRole(User user, string role);
    Task RemoveUserFromRole(User user, string role);
    Task<List<string>> GetUserRoles(User user);
    Task<User?> GetUserByEmail(string email);
    Task<User?> GetUserById(string id);
}