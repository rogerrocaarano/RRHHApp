namespace RRHHApp.Api.Application.DTOs;

public class JobOfferRequirementDto
{
    public Guid Id { get; set; }
    public Guid JobOfferId { get; set; }
    public string Description { get; set; }
    public int Value { get; set; }
    public bool Required { get; set; }
}
