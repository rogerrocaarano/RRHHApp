using Microsoft.EntityFrameworkCore;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Infraestructure.Persistence.EF;

public class EfJobOfferRepository(AppDbContext context) : IJobOfferRepository
{
    private readonly AppDbContext _context = context;
    public async Task<JobOffer?> GetById(Guid id)
    {
        var jobOffer = await _context.JobOffers.FindAsync(id);
        return jobOffer;
    }

    public async Task<List<JobOffer>> GetAll()
    {
        var jobOffers = await _context.JobOffers.ToListAsync();
        return jobOffers;
    }

    public async Task<JobOffer?> Add(JobOffer jobOffer)
    {
        await _context.JobOffers.AddAsync(jobOffer);
        await _context.SaveChangesAsync();
        return await _context.JobOffers.FindAsync(jobOffer.Id);
    }

    public async Task<JobOffer> Update(JobOffer jobOffer)
    {
        var updatedJobOffer = _context.JobOffers.Update(jobOffer);
        await _context.SaveChangesAsync();
        return updatedJobOffer.Entity;
    }

    public async Task Delete(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<JobRequirement?> AddRequirement(JobRequirement jobRequirement)
    {
        await _context.JobRequirements.AddAsync(jobRequirement);
        await _context.SaveChangesAsync();
        return await _context.JobRequirements.FindAsync(jobRequirement.Id);
    }

    public async Task<JobRequirement?> GetRequirement(Guid requirementId)
    {
        var jobRequirement = await _context.JobRequirements.FindAsync(requirementId);
        return jobRequirement;
    }

    public async Task<List<JobRequirement>> GetAllRequirements(Guid jobOfferId)
    {
        var jobRequirements = await _context.JobRequirements.Where(jr => jr.JobOfferId == jobOfferId).ToListAsync();
        return jobRequirements;
    }
}