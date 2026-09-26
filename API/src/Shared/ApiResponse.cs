using System.Text.Json.Serialization;

namespace OppositeTalk.Shared;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public ApiError? Error { get; set; }
    public string TraceId { get; set; } = Guid.NewGuid().ToString();

    public static ApiResponse<T> Ok(T data) => new() { Success = true, Data = data };

    public static ApiResponse<T> Fail(string code, string message, IEnumerable<string>? details = null) => new()
    {
        Success = false,
        Error = new ApiError { Code = code, Message = message, Details = details?.ToList() ?? new() }
    };
}

public class ApiError
{
    public string Code { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public List<string> Details { get; set; } = new();
}
