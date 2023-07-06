using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace PC.Server.Model;

public class LoginRequest
{
    #region Свойства

    [Required]
    [NotNull]
    public string Login { get; set; } = string.Empty;
    
    [Required]
    public string Password64 { get; set; } = string.Empty;

    #endregion
}
