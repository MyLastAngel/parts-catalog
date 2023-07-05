namespace PC.Core.Enums;

/// <summary>Права доступа </summary>
public enum UserAccessRights : byte
{
    None = 0,
    Manager = 1,
    Designer = 2,
    Adminstrator = Manager | Designer,
}
