using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RRHHApp.Api.Application.DTOs;
using RRHHApp.Api.Application.Interfaces;

namespace RRHHApp.Api.Adapters.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class JobOffersController(IJobOfferAppService jobOfferAppService) : ControllerBase
{
    private readonly IJobOfferAppService _jobOfferAppService = jobOfferAppService;

    [HttpGet]
    public async Task<ActionResult> GetJobOffers()
    {
        List<JobOfferDto> jobOffers;
        if (User.IsInRole("Admin") || User.IsInRole("Director") || User.IsInRole("Recruiter"))
        {
            jobOffers = await _jobOfferAppService.GetJobOffers();
        }
        else
        {
            jobOffers = await _jobOfferAppService.GetPublishedJobOffers();
        }
        return Ok(jobOffers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetJobOffer(Guid id)
    {
        JobOfferDto jobOffer;
        if (User.IsInRole("Admin") || User.IsInRole("Director") || User.IsInRole("Recruiter"))
        {
            jobOffer = await _jobOfferAppService.GetJobOffer(id);
        }
        else
        {
            jobOffer = await _jobOfferAppService.GetPublishedJobOffer(id);
        }

        return Ok(jobOffer);
    }

    [HttpGet("{id}/Requirements")]
    public async Task<ActionResult> GetJobOfferRequirements(Guid id)
    {
        var jobOfferResponse = await GetJobOffer(id);
        if (jobOfferResponse is NotFoundResult)
        {
            return NotFound();
        }
        var requirements = await _jobOfferAppService.GetJobOfferRequirements(id);
        return Ok(requirements);
    }

    [HttpGet("{id}/Requirements/{requirementId}")]
    public async Task<ActionResult> GetJobOfferRequirement(Guid id, Guid requirementId)
    {
        var jobOfferResponse = await GetJobOffer(id);
        if (jobOfferResponse is NotFoundResult)
        {
            return NotFound();
        }

        var requirements = await _jobOfferAppService.GetJobOfferRequirements(id);
        return Ok(requirements);
    }

    [HttpPost("Create")]
    [Authorize(Roles = "Admin,Director,Recruiter")]
    public async Task<ActionResult> CreateJobOffer([FromBody] CreateJobOfferDto createJobOfferDto)
    {
        await _jobOfferAppService.CreateJobOffer(createJobOfferDto);
        return Ok();
    }

    [HttpPost("AddRequirement")]
    [Authorize(Roles = "Admin,Director,Recruiter")]
    public async Task<ActionResult> AddRequirement([FromBody] CreateJobOfferRequirementDto jobOfferRequirementDto)
    {
        await _jobOfferAppService.AddRequirement(jobOfferRequirementDto);
        return Ok();
    }
}