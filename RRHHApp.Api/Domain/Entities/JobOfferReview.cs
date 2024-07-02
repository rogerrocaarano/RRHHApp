namespace RRHHApp.Api.Domain.Entities;

public class JobOfferReview
{
    public Guid Id { get; set; }
    public DateTime RequestDate { get; set; }
    public Guid RequestedById { get; set; }
    public Recruiter RequestedBy { get; set; }
    public Guid ReviewedById { get; set; }
    public Director ReviewedBy { get; set; }
    public DateTime? ReviewDate { get; set; }
    public string? ReviewerComment { get; set; }
    public bool Approved { get; set; }
    public Guid JobOfferId { get; set; }
    public JobOffer JobOffer { get; set; }
}