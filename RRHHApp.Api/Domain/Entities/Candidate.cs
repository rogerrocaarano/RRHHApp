namespace RRHHApp.Api.Domain.Entities;

public class Candidate : User
{
    List<CandidateStudies> Studies { get; set; }
    List<JobExperience> JobExperiences { get; set; }
    List<JobReference> JobReferences { get; set; }
}