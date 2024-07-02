namespace RRHHApp.Api.Application.DTOs;

public class CreateJobOfferRequirementDto
{
    public Guid JobOfferId { get; set; }
    public string Description { get; set; }
    public int Value { get; set; }
    public bool Required { get; set; }
}
