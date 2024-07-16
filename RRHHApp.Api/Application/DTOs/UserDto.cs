using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Application.DTOs;

public class UserDto
{
    public User User { get; set; }
    public List<UserRole> Roles { get; set; }
}