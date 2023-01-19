using RatATatCatBackEnd.Interface;
using RatATatCatBackEnd.Models.Database;
using RatATatCatBackEnd.Models.GameModels;

namespace RatATatCatBackEnd.Models
{
    public class RankingService : IRankingService
    {
        private readonly IUserInfo _userInfo;
        public RankingService(IUserInfo userInfo)
        {
            _userInfo = userInfo;
        }
        public Dictionary<string, Tuple<int, char>> Calculate(Dictionary<string, int> gameResults, int mode)
        {
            const int def = 20;
            List<int> k = new List<int>();

            foreach (KeyValuePair<string,int> kvp in gameResults)
            {
                var r = GetMmrChangeInRespectToOtherPlayers(gameResults.Keys.ToList(), kvp.Key, mode);
                var defFlux = def + (1 - r) * def;
                var res = defFlux * GetPlayerPosition(gameResults, kvp.Value);
                k.Add((int)Math.Round(res));
            }
            return SaveMmrChange(gameResults.Keys.ToList(), k, mode);
        }
        private double GetPlayerPosition(Dictionary<string, int> gameResults, int value)
        {
            var ordered = gameResults.OrderBy(x => x.Value).ToDictionary(x => x.Key, x => x.Value);
            var i = ordered.Values.ToList().IndexOf(value);
            switch (i)
            {
                case 0:
                    return 1;
                    break;
                case 1:
                    return 0.8;
                    break;
                case 2:
                    return -0.6;
                    break;
                case 3:
                    return -0.6;
                    break;
            }
            return 1;
        }
        private double GetMmrChangeInRespectToOtherPlayers(List<string> names, string player, int mode)
        {
            List<UserInfo> players = new List<UserInfo>();
            foreach (string name in names)
            {
                players.Add(_userInfo.GetUserInfoByUserName(name));
            }
            var current_player = _userInfo.GetUserInfoByUserName(player);
            switch (mode)
            {
                case 1:
                    return Math.Round(current_player.RatMMR / players.Select(x => x.Mmr).Average(), 2);
                    break;
                case 2:
                    return Math.Round(current_player.DragonMMR / players.Select(x => x.Mmr).Average(), 2);
                    break;
                case 3:
                    return Math.Round(current_player.CrowMMR / players.Select(x => x.Mmr).Average(), 2);
                    break;
                default:
                    return Math.Round(current_player.RatMMR / players.Select(x => x.Mmr).Average(), 2);
                    break;
            }
        }
        private Dictionary<string,Tuple<int,char>> SaveMmrChange(List<string> names, List<int> changes, int mode)
        {
            Dictionary<string, Tuple<int,char>> res = new Dictionary<string, Tuple<int,char>>();
            for (int i = 0; i < 4; i++)
            {
                var player = _userInfo.GetUserInfoByUserName(names[i]);
                var change = 0;
                switch (mode)
                {
                    case 1:
                        player.RatMMR += changes[i];
                        change = player.RatMMR += changes[i];
                        break;
                    case 2:
                        player.DragonMMR += changes[i];
                        change = player.DragonMMR += changes[i];
                        break;
                    case 3:
                        player.CrowMMR += changes[i];
                        change = player.CrowMMR += changes[i];
                        break;
                    default:
                        player.RatMMR += changes[i];
                        change = player.RatMMR += changes[i];
                        break;
                }
                
                char c = changes[i] > 0 ? '+' : '-';
                _userInfo.UpdateUser(player);

                var tuple = Tuple.Create(change, c);
                res.Add(names[i], tuple);
            }
            return res;
        }

        public Dictionary<string, int> GetMmrs(Dictionary<string, int> GameResults, int mode)
        {
            var names = GameResults.Keys.ToList();
            Dictionary<string, int> res = new Dictionary<string, int>();
            for (int i = 0; i < 4; i++)
            {
                var player = _userInfo.GetUserInfoByUserName(names[i]);
                switch (mode)
                {
                    case 1:
                        res.Add(names[i], player.RatMMR);
                        break;
                    case 2:
                        res.Add(names[i], player.DragonMMR);
                        break;
                    case 3:
                        res.Add(names[i], player.CrowMMR);
                        break;
                }
            }
            return res;
        }
    }
}
