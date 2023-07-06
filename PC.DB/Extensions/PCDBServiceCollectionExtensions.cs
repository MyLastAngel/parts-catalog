using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PC.Core.Interfaces;
using PC.DB.Services;

namespace PC.DB.Extensions;

public static class PCDBServiceCollectionExtensions
{
    public static void AddPCDataBase(this IServiceCollection services, ConfigurationManager manager)
    {
        services.AddSingleton<IAuthenticationService, AuthentificationService>();
    }
}
