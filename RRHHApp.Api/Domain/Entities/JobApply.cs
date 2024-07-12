namespace RRHHApp.Api.Domain.Entities;

public class JobApply
{
    public Guid Id { get; set; }
    public Candidate Candidate { get; set; }
    public JobOffer JobOffer { get; set; }
    public DateTime ApplyDate { get; set; }
    public float ExpectedSalary { get; set; }
    public string PresentationLetter { get; set; }
    public string Status { get; set; }
}