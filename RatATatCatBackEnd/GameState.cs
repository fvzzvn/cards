using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using RatATatCatBackEnd.Hubs;
using RatATatCatBackEnd.Models;
using System.Collections.Concurrent;

namespace RatATatCatBackEnd
{
    public class GameState
    {
        private static readonly Lazy<GameState> lazy =
             new Lazy<GameState>(() => new GameState());
        public static GameState Instance { get { return lazy.Value; } }

        private readonly ConcurrentDictionary<string, Player> players =
             new ConcurrentDictionary<string, Player>(StringComparer.OrdinalIgnoreCase);

        private readonly ConcurrentDictionary<string, Game> games =
             new ConcurrentDictionary<string, Game>(StringComparer.OrdinalIgnoreCase);

        private GameState()
        {
        }

        public Player CreatePlayer(string gameId,string username, string connectionId)
        {
            Game foundGame;

            foundGame = GetGame(gameId);
                
            Player player = new Player(connectionId, username);
            this.players[connectionId] = player;

            foundGame.AddPlayer(player);

            return player;
        }

        public Player GetPlayer(string playerId)
        {
            Player foundPlayer;
            if (!this.players.TryGetValue(playerId, out foundPlayer))
            {
                return null;
            }

            return foundPlayer;
        }
        public bool IsPlayersReady()
        {

        }
        public Game GetGame(string roomId)
        {
            Game foundGame = this.games.Values.FirstOrDefault(g => g.Id == roomId);

            if (foundGame == null)
            {
                return null;
            }

            return foundGame;
        }

        public void RemoveGame(string gameId)
        {
            // Remove the game
            Game foundGame;
            if (!this.games.TryRemove(gameId, out foundGame))
            {
                throw new InvalidOperationException("Game not found.");
            }

            // Remove the players, best effort
            Player foundPlayer;
            this.players.TryRemove(foundGame.Player1.Id, out foundPlayer);
            this.players.TryRemove(foundGame.Player2.Id, out foundPlayer);
        }

        public async Task<Game> CreateGame(string gameId)
        {
            // Define the new game and add to waiting pool
            Game game = new Game(gameId);
            this.games[game.Id] = game;

            return game;
        }
        
    }
}
