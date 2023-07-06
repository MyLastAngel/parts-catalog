using PC.Core.Enums;
using PC.Core.Interfaces;
using PC.Core.Model;
using System.Diagnostics.CodeAnalysis;

namespace PC.DB.Services;

public class AuthentificationService : IAuthenticationService
{
    public async Task<AuthenticationUser> Authenticate([NotNull] string login, string psw64)
    {
        return await Task.Run(() =>
        {
            return new AuthenticationUser()
            {
                Login = login,
                Name = "Тесторый пользователь",
                Id = 1,
                Rights = GetRinght(login),
                Token = Guid.NewGuid().ToString()
            };
        });
    }

    private UserAccessRights GetRinght(string login)
    {
        switch (login.ToLower())
        {
            case "adm":
                return UserAccessRights.Adminstrator;
            case "rlt":
                return UserAccessRights.Designer;
            default:
                return UserAccessRights.Manager;
        }
    }
}