namespace RRHHApp.Api.Infraestructure.Persistence.DbSeeder;


public interface IDbSeeder
{
    Task SeedRoles();
    Task MigrateDatabase();
    Task AddRoleToAdminUser();
}