using System.Security.Claims;
using RRHHApp.Api.Application.DTOs;

namespace RRHHApp.Api.Application.Interfaces;

public interface IUsersAppService
{
    Task<List<UserDto>> GetUsers();
    Task<UserDto> GetUserById(Guid id);
    Task<UserDto> GetUserByEmail(string email);
    Task<UserDto> AddUserToRole(Guid userId, string role);
    Task<UserDto> RemoveUserFromRole(Guid userId, string role);
    Task<UserDto> GetLoggedUser(ClaimsPrincipal user);
}