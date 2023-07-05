using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PC.Authentication.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddPCAuthentication(builder.Configuration);

#if DEBUG

// Убираем CORS 
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.SetIsOriginAllowed((url) =>
            {
                return true;
            });
            builder
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

#endif

// Build
var app = builder.Build();

app.UsePCAuthentication();

app.UseStaticFiles();
app.UseDefaultFiles();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();

#if DEBUG

app.UseCors();

#endif

app.Run();
