using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RRHHApp.Api.Application.Interfaces;
using RRHHApp.Api.Application.Services;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;
using RRHHApp.Api.Domain.Services;
using RRHHApp.Api.Infraestructure.Persistence;
using RRHHApp.Api.Infraestructure.Persistence.EF;
using RRHHApp.Api.Infraestructure.Persistence.Memory;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Add repositories
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddIdentity<User, UserRole>(options => 
        options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddSingleton<IJobOfferRepository, MemJobOfferRepository>();
builder.Services.AddSingleton<IJobOfferReviewRepository, MemJobOfferReviewRepository>();

// Add domain services
builder.Services.AddSingleton<JobOfferService>();
builder.Services.AddSingleton<JobOfferService>();

// Add Application services
builder.Services.AddSingleton<IJobOfferAppService, JobOfferAppService>();

// Configuring CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("*")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.MapControllers();
app.UseHttpsRedirection();

app.Run();