namespace RatATatCatBackEnd.Interface
{
    public interface IRankingService
    {
        Dictionary<string, Tuple<int, char>> Calculate(Dictionary<string, int> GameResults, int mode);
        Dictionary<string, int> GetMmrs(Dictionary<string, int> GameResults, int mode);
    }
}