namespace RRHHApp.Api.Application.DTOs;

public class UpdateJobOfferDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime ExpirationDate { get; set; }
    public bool DisplayBudget { get; set; }
    public float Budget { get; set; }
}