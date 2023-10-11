namespace Identity.Exceptions
{
    public class UserNotFoundException
        : Exception
    {
        public UserNotFoundException(string email)
            : base($"There is no USER with EMAIL {email}") { }

        public UserNotFoundException()
            : base("User not found") { }
    }
}
