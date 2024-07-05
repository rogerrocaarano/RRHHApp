namespace RRHHApp.Api.Application.DTOs;

public class JobOfferDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime? PublishedDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public bool DisplayBudget { get; set; }
    public float Budget { get; set; }
    public string Status { get; set; }
}