using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using RRHHApp.Api.Application.Interfaces;
using RRHHApp.Api.Application.Services;
using RRHHApp.Api.Domain.Entities;
using RRHHApp.Api.Domain.Repositories;
using RRHHApp.Api.Domain.Services;
using RRHHApp.Api.Infraestructure.ExternalServices.MailKit;
using RRHHApp.Api.Infraestructure.Persistence.DbSeeder;
using RRHHApp.Api.Infraestructure.Persistence.EF;
using RRHHApp.Api.Infraestructure.Persistence.Identity;
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

// Register the UserStore and RoleStore with the IUserStore and IRoleStore interfaces for dependency injection
builder.Services.AddScoped<IUserStore<User>>(provider =>
    new UserStore<User, UserRole, AppDbContext>(
        provider.GetRequiredService<AppDbContext>()));
builder.Services.AddScoped<IRoleStore<UserRole>>(provider =>
    new RoleStore<UserRole, AppDbContext, string>(
        provider.GetRequiredService<AppDbContext>()));

// Now, when CustomUserManager is resolved, it should receive a properly instantiated UserStore
builder.Services.AddScoped<UserManager<User>, CustomUserManager>();
builder.Services.AddScoped<RoleManager<UserRole>, CustomRoleManager>();

// Database seeder
builder.Services.Configure<DbSeederSettings>(builder.Configuration.GetSection("DbSeederSettings"));
builder.Services.AddScoped<IDbSeeder, DbSeeder>();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add repositories
builder.Services.AddScoped<IJobOfferRepository, EfJobOfferRepository>();
builder.Services.AddScoped<IJobOfferReviewRepository, MemJobOfferReviewRepository>();
builder.Services.AddScoped<IUsersRepository, CustomUserManager>();
builder.Services.AddScoped<IUserRolesRepository, CustomRoleManager>();

// Ensure domain services are added only once
builder.Services.AddScoped<JobOfferService>();
builder.Services.AddScoped<UsersService>();

// Add Application services
builder.Services.AddScoped<IJobOfferAppService, JobOfferAppService>();
builder.Services.AddScoped<IUsersAppService, UsersAppService>();

// Configuring CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
         //builder => builder.WithOrigins("*")
          builder => builder.WithOrigins("http://localhost:5173/")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowSpecificOrigin");
app.MapControllers();
app.UseHttpsRedirection();
app.MapIdentityApi<User>();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<IDbSeeder>();
    await seeder.MigrateDatabase();
    await seeder.SeedRoles();
    await seeder.SeedTestUsers();
    await seeder.AddRoleToAdminUser();
}


app.Run();