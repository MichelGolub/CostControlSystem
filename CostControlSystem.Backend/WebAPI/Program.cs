using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using WebAPI.Middleware;
using Application;
using Application.Interfaces;
using Application.Common.Mappings;
using Identity;
using Identity.Contexts;
using Persistance;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
    config.AddProfile(new AssemblyMappingProfile(typeof(ICostControlSystemDbContext).Assembly));
});
builder.Services.AddIdentityInfrastructure(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.CustomSchemaIds(type => type.ToString());
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = builder.Services.BuildServiceProvider().CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    try
    {
        var context = serviceProvider.GetRequiredService<CostControlSystemDbContext>();
        var userManager = serviceProvider.GetRequiredService<UserManager<Identity.Models.User>>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        IdentityContextSeed.SeedEssentialAsync(userManager, roleManager)
            .GetAwaiter().GetResult();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
    }
}

app.UseCustomExceptionHandler();

app.UseRouting();
app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
