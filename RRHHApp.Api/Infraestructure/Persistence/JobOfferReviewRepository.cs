using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;

namespace RRHHApp.Api.Infraestructure.Persistence;

public class JobOfferReviewRepository: IJobOfferReviewRepository
{
    public async Task<JobOfferReview> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<JobOfferReview>> GetAll()
    {
        throw new NotImplementedException();
    }

    public async Task Add(JobOfferReview jobOfferReview)
    {
        throw new NotImplementedException();
    }
}