using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Infraestructure.Persistence.Memory;

public class MemJobOfferRepository : IJobOfferRepository
{
    // Todo: Implementar utilizando una base de datos real con Entity Framework
    private readonly List<JobOffer> _jobOffers = new List<JobOffer>();
    private readonly List<JobRequirement> _jobRequirements = new List<JobRequirement>();


    public async Task<JobOffer?> GetById(Guid id)
    {
        var jobOffer = _jobOffers.FirstOrDefault(jo => jo.Id == id);
        return jobOffer;
    }

    public async Task<List<JobOffer>> GetAll()
    {
        return _jobOffers;
    }

    public async Task<JobOffer?> Add(JobOffer jobOffer)
    {
        _jobOffers.Add(jobOffer);
        return _jobOffers.FirstOrDefault(jo => jo.Id == jobOffer.Id);
    }

    public async Task<JobOffer> Update(JobOffer jobOffer)
    {
        throw new NotImplementedException();
    }

    public async Task Delete(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<JobRequirement?> AddRequirement(JobRequirement jobRequirement)
    {
        _jobRequirements.Add(jobRequirement);
        return _jobRequirements.FirstOrDefault(jr => jr.Id == jobRequirement.Id);
    }

    public async Task<JobRequirement?> GetRequirement(Guid requirementId)
    {
        var jobRequirement = _jobRequirements.FirstOrDefault(jr => jr.Id == requirementId);
        return jobRequirement;
    }

    public async Task<List<JobRequirement>> GetAllRequirements(Guid jobOfferId)
    {
        return _jobRequirements.Where(jr => jr.JobOfferId == jobOfferId).ToList();
    }
}