using System.Security.Claims;
using RRHHApp.Api.Application.DTOs;
using RRHHApp.Api.Application.Interfaces;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Services;

namespace RRHHApp.Api.Application.Services;

public class UsersAppService(UsersService usersService): IUsersAppService
{
    private readonly UsersService _usersService = usersService;
    public async Task<List<UserDto>> GetUsers()
    {
        var users = await _usersService.GetUsers();
        var usersDto = users.Select(user => MapUserToUserDto(user)).ToList();
        return usersDto;
    }

    public async Task<UserDto> GetUserById(Guid id)
    {
        var user = await _usersService.GetUserById(id);
        return MapUserToUserDto(user);
    }

    public async Task<UserDto> GetUserByEmail(string email)
    {
        var user = await _usersService.GetUserByEmail(email);
        return MapUserToUserDto(user);
    }

    public async Task<UserDto> AddUserToRole(Guid userId, string role)
    {
        var user = await _usersService.GetUserById(userId);
        await _usersService.AddUserToRole(user, role);
        return MapUserToUserDto(user);
    }

    public async Task<UserDto> RemoveUserFromRole(Guid userId, string role)
    {
        var user = await _usersService.GetUserById(userId);
        await _usersService.RemoveUserFromRole(user, role);
        return MapUserToUserDto(user);
    }

    public async Task<UserDto> GetLoggedUser(ClaimsPrincipal user)
    {
        var userEntity = await _usersService.GetLoggedUser(user);
        return MapUserToUserDto(userEntity);
    }

    private UserDto MapUserToUserDto(User user)
    {
        var roles = _usersService.GetUserRoles(user).Result;
        return new UserDto
        {
            User = user,
            Roles = roles
        };
    }
    
}