using RRHHApp.Api.Application.DTOs;
using RRHHApp.Api.Application.Interfaces;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Services;

namespace RRHHApp.Api.Application.Services;

public class JobOfferAppService(JobOfferService jobOfferService): IJobOfferAppService
{
    private readonly JobOfferService _jobOfferService = jobOfferService;
    
    private JobOfferDto MapJobOfferToDto(JobOffer jobOffer)
    {
        return new JobOfferDto
        {
            Id = jobOffer.Id,
            Title = jobOffer.Title,
            Description = jobOffer.Description,
            ExpirationDate = jobOffer.ExpirationDate,
            DisplayBudget = jobOffer.DisplayBudget,
            Budget = jobOffer.Budget,
            Status = jobOffer.Status
        };
    }
    
    private JobOffer MapDtoToJobOffer(CreateJobOfferDto createJobOfferDto)
    {
        return new JobOffer
        {
            Id = Guid.NewGuid(),
            Title = createJobOfferDto.Title,
            Description = createJobOfferDto.Description,
            ExpirationDate = createJobOfferDto.ExpirationDate,
            LastUpdatedDate = DateTime.Now.ToUniversalTime(),
            DisplayBudget = createJobOfferDto.DisplayBudget,
            Budget = createJobOfferDto.Budget,
            Status = "Pending approval",
            Requirements = new List<JobRequirement>(),
            // Reviews = new List<JobOfferReview>(),
            // Applies = new List<JobApply>()
        };
    }
    
    private JobRequirement MapDtoToJobRequirement(CreateJobOfferRequirementDto createJobOfferRequirementDto)
    {
        return new JobRequirement
        {
            Id = Guid.NewGuid(),
            Description = createJobOfferRequirementDto.Description,
            Value = createJobOfferRequirementDto.Value,
            Required = createJobOfferRequirementDto.Required
        };
    }
    
    private JobOfferRequirementDto MapJobRequirementToDto(JobRequirement jobRequirement)
    {
        return new JobOfferRequirementDto
        {
            Id = jobRequirement.Id,
            Description = jobRequirement.Description,
            Value = jobRequirement.Value,
            Required = jobRequirement.Required
        };
    }
    
    public async Task<JobOfferDto> GetJobOffer(Guid id)
    {
        var jobOffer = await _jobOfferService.GetJobOffer(id);
        return MapJobOfferToDto(jobOffer);
    }

    public async Task<List<JobOfferDto>> GetJobOffers()
    {
        var jobOffers = await _jobOfferService.GetAllJobOffers();
        return jobOffers.Select(MapJobOfferToDto).ToList();
    }

    public async Task<JobOfferDto> CreateJobOffer(CreateJobOfferDto createJobOfferDto)
    {
        var jobOffer = MapDtoToJobOffer(createJobOfferDto);
        var addedJobOffer = await _jobOfferService.CreateJobOffer(jobOffer);
        return MapJobOfferToDto(addedJobOffer);
    }

    public async Task<JobOfferDto> UpdateJobOffer(UpdateJobOfferDto updateJobOfferDto)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteJobOffer(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<JobOfferRequirementDto> AddRequirement(Guid jobOfferId, CreateJobOfferRequirementDto jobOfferRequirementDto)
    {
        var jobOffer = _jobOfferService.GetJobOffer(jobOfferId);
        // TODO: Actualizar la oferta con el nuevo requisito
        
        var jobOfferRequirement = MapDtoToJobRequirement(jobOfferRequirementDto);
        var addedJobRequirement = await _jobOfferService.AddJobRequirement(jobOfferRequirement);
        return MapJobRequirementToDto(addedJobRequirement);
    }

    public async Task<List<JobOfferRequirementDto>> GetJobOfferRequirements(Guid jobOfferId)
    {
        var requirements = await _jobOfferService.GetAllJobOfferRequirements(jobOfferId);
        return requirements.Select(MapJobRequirementToDto).ToList();
    }

    public async Task<JobOfferRequirementDto> GetJobOfferRequirement(Guid jobOfferId, Guid requirementId)
    {
        var requirement = await _jobOfferService.GetJobOfferRequirement(requirementId);
        return MapJobRequirementToDto(requirement);
    }
}