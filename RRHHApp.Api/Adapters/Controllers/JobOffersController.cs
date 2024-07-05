using Microsoft.AspNetCore.Mvc;
using RRHHApp.Api.Application.DTOs;
using RRHHApp.Api.Application.Interfaces;
using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Adapters.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class JobOffersController(IJobOfferAppService jobOfferAppService) : ControllerBase
{
    private readonly IJobOfferAppService _jobOfferAppService = jobOfferAppService;
    
    [HttpGet]
    public async Task<ActionResult> GetJobOffers()
    {
        var jobOffers = await _jobOfferAppService.GetJobOffers();
        return Ok(jobOffers);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetJobOffer(Guid id)
    {
        var jobOffer = await _jobOfferAppService.GetJobOffer(id);
        return Ok(jobOffer);
    }
    
    [HttpGet("{id}/Requirements")]
    public async Task<ActionResult> GetJobOfferRequirements(Guid id)
    {
        var requirements = await _jobOfferAppService.GetJobOfferRequirements(id);
        return Ok(requirements);
    }
    
    [HttpGet("{id}/Requirements/{requirementId}")]
    public async Task<ActionResult> GetJobOfferRequirement(Guid id, Guid requirementId)
    {
        var requirement = await _jobOfferAppService.GetJobOfferRequirement(id, requirementId);
        return Ok(requirement);
    }
    
    [HttpPost("Create")]
    public async Task<ActionResult> CreateJobOffer([FromBody] CreateJobOfferDto createJobOfferDto)
    {
        await _jobOfferAppService.CreateJobOffer(createJobOfferDto);
        return Ok();
    }
    
    [HttpPost("AddRequirement")]
    public async Task<ActionResult> AddRequirement([FromBody] JobOfferRequirementDto jobOfferRequirementDto)
    {
        // await _jobOfferAppService.AddRequirement(jobOfferRequirementDto.JobOfferId, jobOfferRequirementDto);
        return Ok();
    }
}