using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Domain.Repositories;

public interface IJobOfferReviewRepository
{
    Task<JobOfferReview> GetById(Guid id);
    Task<List<JobOfferReview>> GetAll();
    Task Add(JobOfferReview jobOfferReview);
}