using Microsoft.IdentityModel.Tokens;
using PC.Authentication.Interfaces;
using PC.Authentication.Options;
using PC.Core.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PC.Authentication.Services;

internal class JwtTokenGeneratorService : IAuthenticationTokenGeneratorService
{
    #region Поля

    private readonly AuthenticationOptions _authOptions;

    #endregion

    public JwtTokenGeneratorService(AuthenticationOptions authOptions)
    {
        _authOptions = authOptions ?? throw new ArgumentNullException(nameof(authOptions));
    }

    public string Generate(AuthenticationUser response)
    {
        var securityKey = _authOptions.GetSymmetricKey();

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Name, response.Name),
            new Claim(JwtRegisteredClaimNames.NameId, $"{response.Id}"),
            new Claim(JwtRegisteredClaimNames.Sub, response.Token),
            new Claim("login", response.Login),
        };

        var external = response.GetExternalData();
        if (external != null)
        {
            foreach (var kv in external)
                claims.Add(new Claim(kv.Key, kv.Value));
        }

        var token = new JwtSecurityToken(
            _authOptions.Issuer,
            _authOptions.Audience,
            claims,
            expires: DateTime.Now.AddMinutes(_authOptions.LifetimeMin),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}