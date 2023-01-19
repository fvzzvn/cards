using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd
{
    public interface IGameState
    {
        Task<IGame> CreateGame(string gameId, int mode);
        Player CreatePlayer(string gameId, string username, int userId, int Mmr, string connectionId);
        IGame GetGame(string roomId);
        Player GetPlayer(string playerId);
        bool ArePlayersReady(string gameId);
        void RemoveGame(string gameId);
    }
}