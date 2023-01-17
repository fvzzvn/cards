﻿using RatATatCatBackEnd.Interface;
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
        public Dictionary<string, Tuple<int, char>> Calculate(Dictionary<string, int> gameResults)
        {
            const int def = 20;
            List<int> k = new List<int>();

            foreach (KeyValuePair<string,int> kvp in gameResults)
            {
                var r = GetMmrChangeInRespectToOtherPlayers(gameResults.Keys.ToList(), kvp.Key);
                var defFlux = def + (1 - r) * def;
                var res = defFlux * GetPlayerPosition(gameResults, kvp.Value);
                k.Add((int)Math.Round(res));
            }
            return SaveMmrChange(gameResults.Keys.ToList(), k);
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
        private double GetMmrChangeInRespectToOtherPlayers(List<string> names, string player)
        {
            List<UserInfo> players = new List<UserInfo>();
            foreach (string name in names)
            {
                players.Add(_userInfo.GetUserInfoByUserName(name));
            }
            var current_player = _userInfo.GetUserInfoByUserName(player);
            return Math.Round(current_player.Mmr / players.Select(x => x.Mmr).Average(),2);
        }
        private Dictionary<string,Tuple<int,char>> SaveMmrChange(List<string> names, List<int> changes)
        {
            Dictionary<string, Tuple<int,char>> res = new Dictionary<string, Tuple<int,char>>();
            for (int i = 0; i < 4; i++)
            {
                var player = _userInfo.GetUserInfoByUserName(names[i]);
                player.Mmr += changes[i];
                char c = changes[i] > 0 ? '+' : '-';
                _userInfo.UpdateUser(player);

                var tuple = Tuple.Create(player.Mmr, c);
                res.Add(names[i], tuple);
            }
            return res;
        }

        public Dictionary<string, int> GetMmrs(Dictionary<string, int> GameResults)
        {
            var names = GameResults.Keys.ToList();
            Dictionary<string, int> res = new Dictionary<string, int>();
            for (int i = 0; i < 4; i++)
            {
                var player = _userInfo.GetUserInfoByUserName(names[i]);
                res.Add(names[i], player.Mmr);
            }
            return res;
        }
    }
}