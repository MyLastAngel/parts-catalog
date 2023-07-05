using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PC.Authentication.Interfaces;
using PC.Authentication.Options;
using PC.Authentication.Services;
using System;

namespace PC.Authentication.Extensions;

public static class PCAuthenticationServiceCollectionExtensions
{
    public static void AddPCAuthentication(this IServiceCollection services, ConfigurationManager manager)
    {
        var cfg = manager.GetSection("Auth").Get<AuthenticationOptions>();

        ArgumentNullException.ThrowIfNull(cfg);

        // Сеансы
        services.AddDistributedMemoryCache();
        services.AddSession(options =>
        {
            options.Cookie.Name = "PC.Session";
            options.Cookie.IsEssential = true;
            options.IdleTimeout = TimeSpan.FromMinutes(cfg.LifetimeMin);
        });

        services.AddSingleton(cfg);
        services.AddSingleton<IAuthenticationTokenGeneratorService, JwtTokenGeneratorService>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = cfg.IsUseHttps;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = cfg.Issuer,

                    ValidateAudience = true,
                    ValidAudience = cfg.Audience,

                    ValidateLifetime = true,

                    IssuerSigningKey = cfg.GetSymmetricKey(),
                    ValidateIssuerSigningKey = true
                };

            });
    }
}
