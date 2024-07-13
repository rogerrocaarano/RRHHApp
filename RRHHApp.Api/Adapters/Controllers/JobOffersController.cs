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
        if (User.IsInRole("Candidate"))
        {
            // obtener solamente las ofertas publicadas y no vencidas
            jobOffers = await _jobOfferAppService.GetPublishedJobOffers();
        }
        else
        {
            jobOffers = await _jobOfferAppService.GetJobOffers();
        }

        return Ok(jobOffers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetJobOffer(Guid id)
    {
        JobOfferDto jobOffer;
        if (User.IsInRole("Candidate"))
        {
            // mostrar solamente si la oferta está publicada y no vencida
            jobOffer = await _jobOfferAppService.GetPublishedJobOffer(id);
        }
        else
        {
            jobOffer = await _jobOfferAppService.GetJobOffer(id);
        }

        return Ok(jobOffer);
    }

    [HttpGet("{id}/Requirements")]
    public async Task<ActionResult> GetJobOfferRequirements(Guid id)
    {
        List<JobOfferRequirementDto> requirements;
        if (User.IsInRole("Candidate"))
        {
            // mostrar solamente si la oferta está publicada y no vencida
            requirements = await _jobOfferAppService.GetJobOfferRequirements(id);
        }
        else
        {
            requirements = await _jobOfferAppService.GetJobOfferRequirements(id);
        }

        return Ok(requirements);
    }

    [HttpGet("{id}/Requirements/{requirementId}")]
    public async Task<ActionResult> GetJobOfferRequirement(Guid id, Guid requirementId)
    {
        JobOfferRequirementDto requirement;
        if (User.IsInRole("Candidate"))
        {
            // mostrar solamente si la oferta está publicada y no vencida
            requirement = await _jobOfferAppService.GetJobOfferRequirement(id, requirementId);
        }
        else
        {
            requirement = await _jobOfferAppService.GetJobOfferRequirement(id, requirementId);
        }

        return Ok(requirement);
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