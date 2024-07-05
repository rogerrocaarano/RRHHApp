using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Domain.Services;

public class JobOfferService(IJobOfferRepository jobOfferRepository)
{
    private readonly IJobOfferRepository _jobOfferRepository = jobOfferRepository;

    public async Task<JobOffer> CreateJobOffer(JobOffer jobOffer)
    {
        var addedJobOffer = await _jobOfferRepository.Add(jobOffer);
        return addedJobOffer;
    }

    public async Task<JobRequirement> AddJobRequirement(JobRequirement jobRequirement)
    {
        var addedJobRequirement = await _jobOfferRepository.AddRequirement(jobRequirement);
        return addedJobRequirement;
    }

    public async Task<JobOffer> UpdateJobOffer()
    {
        throw new NotImplementedException();
    }

    public async Task DeleteJobOffer()
    {
        throw new NotImplementedException();
    }

    public async Task<JobOffer> GetJobOffer(Guid id)
    {
        var jobOffer = await _jobOfferRepository.GetById(id);
        if (jobOffer == null)
        {
            throw new Exception("Job offer not found");
        }

        return jobOffer;
    }

    public async Task<List<JobOffer>> GetAllJobOffers()
    {
        var jobOffers = await _jobOfferRepository.GetAll();
        return jobOffers;
    }

    public async Task<JobRequirement> GetJobOfferRequirement(Guid requirementId)
    {
        var requirement = await _jobOfferRepository.GetRequirement(requirementId);
        return requirement;
    }

    public async Task<List<JobRequirement>> GetAllJobOfferRequirements(Guid jobOfferId)
    {
        var requirements = await _jobOfferRepository.GetAllRequirements(jobOfferId);
        return requirements;
    }

    public async Task<JobApply> ApplyToJobOffer()
    {
        throw new NotImplementedException();
    }

    public async Task<JobOffer> AddJobOfferRequirement(JobRequirement jobRequirement)
    {
        var jobOffer = await _jobOfferRepository.GetById(jobRequirement.JobOfferId);
        if (jobOffer == null)
        {
            throw new Exception("Job offer not found");
        }
        var requirement = await _jobOfferRepository.AddRequirement(jobRequirement);
        return await GetJobOffer(requirement.JobOfferId);
    }
}