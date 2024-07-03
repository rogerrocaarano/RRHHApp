using RRHHApp.Api.Domain.Repositories;
using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Domain.Services;

public class JobOfferReviewService(IJobOfferReviewRepository jobOfferReviewRepository)
{
    private readonly IJobOfferReviewRepository _jobOfferReviewRepositoryRepository = jobOfferReviewRepository;
    
    public void AddReviewToJobOffer()
    {
        throw new NotImplementedException();
    }
    
    public void ApproveJobOffer()
    {
        throw new NotImplementedException();
    }
}