namespace RatATatCatBackEnd.Interface
{
    public interface IRankingService
    {
        void Calculate(Dictionary<string, int>? GameResults);
    }
}