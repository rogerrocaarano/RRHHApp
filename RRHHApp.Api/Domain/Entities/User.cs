using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace RRHHApp.Api.Domain.Entities;

public class User : IdentityUser
{
    public string? Name { get; set; }
    public string? LastName { get; set; }
    public string? IdDocument { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
}