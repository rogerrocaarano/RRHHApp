using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Infraestructure.Persistence.EF;

public class EfJobOfferRepository(AppDbContext context) : IJobOfferRepository
{
    private readonly AppDbContext _context = context;
    public async Task<JobOffer?> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<JobOffer>> GetAll()
    {
        throw new NotImplementedException();
    }

    public async Task<JobOffer?> Add(JobOffer jobOffer)
    {
        throw new NotImplementedException();
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
        throw new NotImplementedException();
    }

    public async Task<JobRequirement?> GetRequirement(Guid requirementId)
    {
        throw new NotImplementedException();
    }

    public async Task<List<JobRequirement>> GetAllRequirements(Guid jobOfferId)
    {
        throw new NotImplementedException();
    }
}