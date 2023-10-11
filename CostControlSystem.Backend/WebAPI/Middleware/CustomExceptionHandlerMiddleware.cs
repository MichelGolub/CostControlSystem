using Application.Common.Exceptions;
using FluentValidation;
using Identity.Exceptions;
using System.Net;
using System.Text.Json;

namespace WebAPI.Middleware
{
    public class CustomExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomExceptionHandlerMiddleware(RequestDelegate next)
            => _next = next;

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex) 
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var result = string.Empty;
            switch (exception)
            {
                case ValidationException validationException:
                    code = HttpStatusCode.BadRequest;
                    result = JsonSerializer.Serialize(validationException.Errors);
                    break;
                case NotFoundException notFoundException:
                    code = HttpStatusCode.NotFound;
                    result = JsonSerializer.Serialize(notFoundException.Message);
                    break;
                case Application.Common.Exceptions.ConflictException conflictException:
                    code = HttpStatusCode.Conflict;
                    result = JsonSerializer.Serialize(conflictException.Message);
                    break;
                case Identity.Exceptions.ConflictException conflictException1:
                    code = HttpStatusCode.Conflict;
                    result = JsonSerializer.Serialize(conflictException1.Message);
                    break;
                case IncorrectPasswordException incorrectPasswordException:
                    code = HttpStatusCode.Unauthorized;
                    result = JsonSerializer.Serialize(incorrectPasswordException.Message);
                    break;
                case UnauthorizedException unauthorizedException:
                    code = HttpStatusCode.Unauthorized;
                    result = JsonSerializer.Serialize(unauthorizedException.Message);
                    break;
                case UserNotFoundException userNotFoundException:
                    code = HttpStatusCode.NotFound;
                    result = JsonSerializer.Serialize(userNotFoundException.Message);
                    break;
            }
            context.Response.ContentType= "application/json";
            context.Response.StatusCode = (int)code;

            if (result == string.Empty)
            {
                result = JsonSerializer.Serialize(new { error = exception.Message });
            }

            return context.Response.WriteAsync(result);
        }
    }
}
