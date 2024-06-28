using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Domain.Services;

public class JobOfferService
{
    private readonly IJobOfferRepository _jobOfferRepository;

    public JobOfferService(IJobOfferRepository jobOfferRepository)
    {
        _jobOfferRepository = jobOfferRepository;
    }
    
    public void CreateJobOffer(JobOffer jobOffer)
    {
        throw new NotImplementedException();
    }
    
    public void AddJobRequirement(JobOffer jobOffer, JobRequirement jobRequirement)
    {
        throw new NotImplementedException();
    }
    
    public void UpdateJobOffer(JobOffer jobOffer)
    {
        throw new NotImplementedException();
    }
    
    public void DeleteJobOffer(Guid id)
    {
        throw new NotImplementedException();
    }
    
    public JobOffer GetJobOffer(Guid id)
    {
        throw new NotImplementedException();
    }
    
    public List<JobOffer> GetAllJobOffers()
    {
        throw new NotImplementedException();
    }
    
    public void ApproveJobOffer(Guid id)
    {
        throw new NotImplementedException();
    }
    
    public void ApplyToJobOffer(Guid id, JobApply jobApply)
    {
        throw new NotImplementedException();
    }
}