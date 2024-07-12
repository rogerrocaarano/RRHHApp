using Microsoft.AspNetCore.Identity.UI.Services;

namespace RRHHApp.Api.Infraestructure.ExternalServices.MailKit;

public interface IMailService : IEmailSender
{
    Task SendEmailAsync(string email, string subject, string htmlMessage);
}
