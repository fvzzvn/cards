using RatATatCatBackEnd.Models.GameModels;
using System.Collections.Concurrent;

namespace RatATatCatBackEnd
{
    public class GameState : IGameState
    {
        private readonly ConcurrentDictionary<string, Player> players =
             new ConcurrentDictionary<string, Player>(StringComparer.OrdinalIgnoreCase);

        private readonly ConcurrentDictionary<string, IGame> games =
             new ConcurrentDictionary<string, IGame>(StringComparer.OrdinalIgnoreCase);

        public GameState()
        {
        }

        public Player CreatePlayer(string gameId, string username, string connectionId)
        {
            IGame foundGame;

            foundGame = GetGame(gameId);

            Player player = new Player(connectionId, username, gameId);
            this.players[connectionId] = player;

            foundGame.Dealer.GiveHand(player);

            foundGame.AddPlayer(player);

            return player;
        }

        public Player GetPlayer(string playerId)
        {
            Player foundPlayer;
            if (!this.players.TryGetValue(playerId, out foundPlayer))
            {
                throw new Exception("Player not found");
                return null;
            }

            return foundPlayer;
        }
        public bool ArePlayersReady(string gameId)
        {
            IGame game = GetGame(gameId);

            game.PlayerTurn = game.Player1;


            return game.IsFull();
        }
        public IGame GetGame(string roomId)
        {
            IGame foundGame = games.Values.FirstOrDefault(g => g.Id == roomId);

            if (foundGame == null)
            {
                return null;
            }

            return foundGame;
        }

        public void RemoveGame(string gameId)
        {
            // Remove the game
            IGame foundGame;
            if (!this.games.TryRemove(gameId, out foundGame))
            {
                throw new InvalidOperationException("Game not found.");
            }

            // Remove the players, best effort
            Player foundPlayer;
            if (foundGame is DefaultGame)
            {
                var defaultFoundGame = (DefaultGame) foundGame;
                this.players.TryRemove(defaultFoundGame.Player1.Id, out foundPlayer);
                this.players.TryRemove(defaultFoundGame.Player2.Id, out foundPlayer);
                this.players.TryRemove(defaultFoundGame.Player3.Id, out foundPlayer);
                this.players.TryRemove(defaultFoundGame.Player4.Id, out foundPlayer);
            }
            if (foundGame is DragonGame)
            {
                var dragonFoundGame = (DragonGame)foundGame;
                this.players.TryRemove(dragonFoundGame.Player1.Id, out foundPlayer);
                this.players.TryRemove(dragonFoundGame.Player2.Id, out foundPlayer);
            }
            if (foundGame is CrowGame)
            {
                var dragonFoundGame = (CrowGame)foundGame;
                this.players.TryRemove(dragonFoundGame.Player1.Id, out foundPlayer);
                this.players.TryRemove(dragonFoundGame.Player2.Id, out foundPlayer);
            }
        }

        public async Task<DefaultGame> CreateGame(string gameId)
        {
            // Define the new game and add to waiting pool
            DefaultGame game = new DefaultGame(gameId);
            this.games[game.Id] = game;

            return game;
        }

    }
}
