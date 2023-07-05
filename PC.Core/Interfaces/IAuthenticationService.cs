using PC.Core.Model;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace PC.Core.Interfaces;

public interface IAuthenticationService
{
    Task<AuthenticationUser> Authenticate([NotNull] string login, string psw64);
}
