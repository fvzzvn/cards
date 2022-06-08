using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using RatATatCatBackEnd.Hubs;
using RatATatCatBackEnd.Models;
using System.Collections.Concurrent;

namespace RatATatCatBackEnd
{
    public class GameState
    {
        private readonly static Lazy<GameState> instance =
            new Lazy<GameState>(() => new GameState(GlobalHost.ConnectionManager.GetHubContext<GameHub>()));


        private readonly ConcurrentDictionary<string, Player> players =
             new ConcurrentDictionary<string, Player>(StringComparer.OrdinalIgnoreCase);

        private readonly ConcurrentDictionary<string, Game> games =
             new ConcurrentDictionary<string, Game>(StringComparer.OrdinalIgnoreCase);

        private GameState(IHubContext context)
        {
            this.Clients = context.Clients;
            this.Groups = context.Groups;
        }

        public IHubConnectionContext<dynamic> Clients { get; set; }
        public IGroupManager Groups { get; set; }

        public Player CreatePlayer(string username, string connectionId)
        {
            Player player = new Player(connectionId, username);
            this.players[connectionId] = player;

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

        public Game GetGame(Player player)
        {
            Game foundGame = this.games.Values.FirstOrDefault(g => g.Id == player.GameId);

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

        public async Task<Game> CreateGame(Player player1, Player player2, Player player3, Player player4)
        {
            // Define the new game and add to waiting pool
            Game game = new Game(player1, player2, player3, player4);
            this.games[game.Id] = game;

            // Create a new group to manage communication using ID as group name
            await this.Groups.Add(player1.Id, groupName: game.Id);
            await this.Groups.Add(player2.Id, groupName: game.Id);
            await this.Groups.Add(player3.Id, groupName: game.Id);
            await this.Groups.Add(player4.Id, groupName: game.Id);

            return game;
        }
    }
}
