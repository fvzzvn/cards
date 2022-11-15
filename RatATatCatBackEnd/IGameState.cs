using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd
{
    public interface IGameState
    {
        Task<DefaultGame> CreateGame(string gameId);
        Player CreatePlayer(string gameId, string username, string connectionId);
        IGame GetGame(string roomId);
        Player GetPlayer(string playerId);
        bool ArePlayersReady(string gameId);
        void RemoveGame(string gameId);
    }
}