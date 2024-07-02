using RRHHApp.Api.Application.DTOs;
using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Application.Interfaces;

public interface IJobOfferAppService
{
    Task<JobOfferDto> GetJobOffer(Guid id);
    Task<List<JobOfferDto>> GetJobOffers();
    Task<JobOfferDto> CreateJobOffer(CreateJobOfferDto createJobOfferDto);
    Task<JobOfferDto> UpdateJobOffer(UpdateJobOfferDto updateJobOfferDto);
    Task DeleteJobOffer(Guid id);
    Task<JobOfferRequirementDto> AddRequirement(Guid jobOfferId, CreateJobOfferRequirementDto jobOfferRequirementDto);
    Task<List<JobOfferRequirementDto>> GetJobOfferRequirements(Guid jobOfferId);
    Task<JobOfferRequirementDto> GetJobOfferRequirement(Guid jobOfferId, Guid requirementId);
}