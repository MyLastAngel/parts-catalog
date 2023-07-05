using PC.Core.Model;

namespace PC.Authentication.Interfaces;

public interface IAuthenticationTokenGeneratorService
{
    string Generate(AuthenticationUser user);
}
