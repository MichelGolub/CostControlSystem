namespace Identity.Exceptions
{
    public class IncorrectPasswordException
        : Exception
    {
        public IncorrectPasswordException()
            : base("Incorrect password") { }
    }
}
