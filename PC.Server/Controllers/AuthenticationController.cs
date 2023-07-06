using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PC.Authentication.Interfaces;
using PC.Core.Interfaces;
using PC.Server.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace PC.Server.Controllers;

[ApiController]
[Route("auth/api")]
public class AuthenticationController : ControllerBase
{
    #region Поля

    private readonly ILogger<AuthenticationController> _logger;
    private readonly IAuthenticationService _auth;
    private readonly IAuthenticationTokenGeneratorService _tokenGenerator;

    #endregion

    public AuthenticationController(
        ILogger<AuthenticationController> logger,
        IAuthenticationService auth,
        IAuthenticationTokenGeneratorService tokenGenerator
        )
    {
        ArgumentNullException.ThrowIfNull(logger);
        ArgumentNullException.ThrowIfNull(auth);
        ArgumentNullException.ThrowIfNull(tokenGenerator);

        _logger = logger;
        _auth = auth;
        _tokenGenerator = tokenGenerator;
    }

    [HttpPost("login")]

    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var user = await _auth.Authenticate(request.Login, request.Password64);
            return Ok(new
            {
                login = request.Login,
                name = user.Name,
                token = _tokenGenerator.Generate(user)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Неудачная попытка регистрации {login}", request.Login);
            return Unauthorized(new { message = $"Ошибка регистрации пользователь: '{request.Login}'" });
        }
    }
}
