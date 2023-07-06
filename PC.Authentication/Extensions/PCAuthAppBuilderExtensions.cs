using Microsoft.AspNetCore.Builder;

namespace PC.Authentication.Extensions;

public static class PCAuthAppBuilderExtensions
{
    public static IApplicationBuilder UsePCAuthentication(this IApplicationBuilder app)
    {
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseSession();

        return app;
    }
}
