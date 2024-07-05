namespace RRHHApp.Api.Domain.Entities;

public class JobOffer
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
    public List<JobRequirement> Requirements { get; set; } = [];
    // public List<JobOfferReview> Reviews { get; set; }
    // public List<JobApply> Applies { get; set; }
}