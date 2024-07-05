namespace RRHHApp.Api.Domain.Entities;

public class Candidate : User
{
    public List<CandidateStudies> Studies { get; set; }
    public List<JobExperience> JobExperiences { get; set; }
    public List<JobReference> JobReferences { get; set; }
}