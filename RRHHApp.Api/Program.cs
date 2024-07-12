using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using RRHHApp.Api.Application.Interfaces;
using RRHHApp.Api.Application.Services;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;
using RRHHApp.Api.Domain.Services;
using RRHHApp.Api.Infraestructure.ExternalServices.MailKit;
using RRHHApp.Api.Infraestructure.Persistence;
using RRHHApp.Api.Infraestructure.Persistence.EF;
using RRHHApp.Api.Infraestructure.Persistence.Memory;

var builder = WebApplication.CreateBuilder(args);

// Builder configuration sources
builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables("DOTNET_");

// Add services to the container.
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();



// Email
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddTransient<IEmailSender, MailService>();

builder.Services.AddIdentity<User, UserRole>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AppDbContext>()
    .AddApiEndpoints()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add repositories
builder.Services.AddScoped<IJobOfferRepository, EfJobOfferRepository>();
builder.Services.AddScoped<IJobOfferReviewRepository, MemJobOfferReviewRepository>();

// Ensure domain services are added only once
builder.Services.AddScoped<JobOfferService>();

// Add Application services
builder.Services.AddScoped<IJobOfferAppService, JobOfferAppService>();

// Configuring CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("*")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Apply database migrations
using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
dbContext.Database.Migrate();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowSpecificOrigin");
app.MapControllers();
app.UseHttpsRedirection();
app.MapIdentityApi<User>();

app.Run();