using Microsoft.AspNetCore.Builder;

namespace PC.Authentication.Extensions;

public static class PCAuthentificationAppBuilderExtensions
{
    public static IApplicationBuilder UsePCAuthentication(this IApplicationBuilder app)
    {
        return app.UseAuthentication()
             .UseAuthorization()
             .UseSession();
    }

}
