namespace RRHHApp.Api.Domain.Entities;

public class CandidateStudies
{
    Guid Id { get; set; }
    string Title { get; set; }
    string Institution { get; set; }
    string AcademicLevel { get; set; }
    bool Finished { get; set; }
    DateTime EndDate { get; set; }
}