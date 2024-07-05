using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RRHHApp.Api.Domain.Entities;

namespace RRHHApp.Api.Infraestructure.Persistence.EF;

public class AppDbContext : IdentityDbContext<User, UserRole, string>
{
    public DbSet<JobOffer> JobOffers { get; set; }
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // modelBuilder.Entity<DisplayFormatAttribute>().HasNoKey();
    }
    
}