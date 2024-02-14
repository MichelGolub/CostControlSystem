namespace Identity.Exceptions
{
    public class IncorrectCredentialsException
        : Exception
    {
        public IncorrectCredentialsException()
            : base("Incorrect credentials") { }
    }
}
