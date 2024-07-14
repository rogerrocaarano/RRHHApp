using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RRHHApp.Api.Application.Interfaces;

namespace RRHHApp.Api.Adapters.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController(IUsersAppService usersAppService) : ControllerBase
{
    private readonly IUsersAppService _usersAppService = usersAppService;

    [HttpGet]
    public async Task<ActionResult> GetUsers()
    {
        var users = await _usersAppService.GetUsers();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetUser(Guid id)
    {
        var user = await _usersAppService.GetUserById(id);
        return Ok(user);
    }

    [HttpGet("GetByEmail/{email}")]
    public async Task<ActionResult> GetUserByEmail(string email)
    {
        var user = await _usersAppService.GetUserByEmail(email);
        return Ok(user);
    }

    [HttpPost("{userId}/AddRole/{role}")]
    public async Task<ActionResult> AddUserToRole(Guid userId, string role)
    {
        var user = await _usersAppService.AddUserToRole(userId, role);
        return Ok(user);
    }

    [HttpPost("{userId}/RemoveRole/{role}")]
    public async Task<ActionResult> RemoveUserFromRole(Guid userId, string role)
    {
        var user = await _usersAppService.RemoveUserFromRole(userId, role);
        return Ok(user);
    }
}
