using System.ComponentModel.DataAnnotations;

namespace RRHHApp.Api.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string FathersLastName { get; set; }
    public string MothersLastName { get; set; }
    public string IdDocument { get; set; }
    public string Address { get; set; }
    public PhoneAttribute Phone { get; set; }
    public EmailAddressAttribute Email { get; set; }
}