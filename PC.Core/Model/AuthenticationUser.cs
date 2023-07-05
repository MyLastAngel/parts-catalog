using PC.Core.Enums;
using System.Collections.Generic;

namespace PC.Core.Model;

/// <summary>Зарегистрированный пользователь</summary>
public class AuthenticationUser
{
    #region Свойства

    public int Id { get; set; }
    public string Login { get; set; } = "";
    public string Name { get; set; } = "";
    public string Token { get; set; } = "";
    public UserAccessRights Rights { get; set; } = UserAccessRights.None;

    #endregion

    public AuthenticationUser()
    {

    }

    public virtual Dictionary<string, string>? GetExternalData()
    {
        return null;
    }
}
