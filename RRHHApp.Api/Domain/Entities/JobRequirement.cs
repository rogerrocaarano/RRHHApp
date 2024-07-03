namespace RRHHApp.Api.Domain.Entities;

public class JobRequirement
{
    public Guid Id { get; set; }
    public Guid JobOfferId { get; set; }
    public string Description { get; set; }
    public int Value { get; set; }
    public bool Required { get; set; }
}