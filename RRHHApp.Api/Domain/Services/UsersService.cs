using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Entities.Enums;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Domain.Services;

public class UsersService(IUsersRepository usersRepository, IUserRolesRepository userRolesRepository)
{
    private readonly IUsersRepository _usersRepository = usersRepository;
    private readonly IUserRolesRepository _userRolesRepository = userRolesRepository;
    
    public async Task<List<User>> GetUsers()
    {
        return await _usersRepository.GetUsers();
    }
    
    public async Task<User?> GetUserById(Guid id)
    {
        return await _usersRepository.GetUserById(id);
    }
    
    public async Task<User?> GetUserByEmail(string email)
    {
        return await _usersRepository.GetUserByEmail(email);
    }

    public async Task AddUserToRole(User user, string role)
    {
        if (!RoleNameIsValid(role))
        {
            throw new ArgumentException("Invalid role name");
        }
        await _usersRepository.AddUserToRole(user, role);
    }

    public async Task RemoveUserFromRole(User user, string role)
    {
        if (!RoleNameIsValid(role))
        {
            throw new ArgumentException("Invalid role name");
        }
        await _usersRepository.RemoveUserFromRole(user, role);
    }

    public async Task<List<string>> GetUserRoleNames(User user)
    {
        var roles = await _usersRepository.GetUserRoles(user);
        return roles;
    }
    
    public async Task<List<UserRole>> GetUserRoles(User user)
    {
        var roles = await _usersRepository.GetUserRoles(user);
        var userRoles = new List<UserRole>();
        foreach (var role in roles)
        {
            var userRole = await GetUserRoleByName(role);
            userRoles.Add(userRole);
        }
        return userRoles;
    }
    
    public bool RoleNameIsValid(string role)
    {
        return Enum.IsDefined(typeof(RoleNames), role);
    }
    
    public async Task<UserRole> GetUserRoleByName(string roleName)
    {
        return await _userRolesRepository.GetUserRoleByName(roleName);
    }
}
