using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Domain.Repositories;

public interface IJobOfferRepository
{
    Task<JobOffer?> GetById(Guid id);
    Task<List<JobOffer>> GetAll();
    Task<JobOffer?> Add(JobOffer jobOffer);
    Task<JobOffer> Update(JobOffer jobOffer);
    Task Delete(Guid id);
    Task<JobRequirement?> AddRequirement(JobRequirement jobRequirement);
    Task<JobRequirement?> GetRequirement(Guid requirementId);
    Task<List<JobRequirement>> GetAllRequirements(Guid jobOfferId);
}