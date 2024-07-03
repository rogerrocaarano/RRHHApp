using System.ComponentModel.DataAnnotations;

namespace RRHHApp.Api.Domain.Entities;

public class JobReference
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Company { get; set; }
    public string Position { get; set; }
    public PhoneAttribute Phone { get; set; }
}