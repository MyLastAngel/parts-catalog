using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace PC.Authentication.Options;

internal class AuthenticationOptions
{
    #region Свойства

    public string Issuer { get; set; } = string.Empty;

    public string Audience { get; set; } = string.Empty;

    public string SecretKey { get; set; } = string.Empty;

    public int LifetimeMin { get; set; }

    public bool IsUseHttps { get; set; } = true;

    #endregion


    public SymmetricSecurityKey GetSymmetricKey()
    {
        return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
    }
}
