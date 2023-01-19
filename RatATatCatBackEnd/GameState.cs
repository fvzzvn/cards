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

        public async Task<IGame> CreateGame(string gameId, int mode)
        {
            IGame game = new DefaultGame(gameId, mode);
            // Define the new game and add to waiting pool
            switch (mode)
            {
                case 1:
                    game = new DefaultGame(gameId, mode);
                    break;
                case 2:
                    game = new DragonGame(gameId, mode);
                    break;
                case 3:
                    game = new CrowGame(gameId, mode);
                    break;
            }
            this.games[game.Id] = game;

            return game;
        }

    }
}
