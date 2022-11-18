import React, { useEffect, useState } from "react";

const Board = (props) => {

  let avgRanking = 0;
  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
  if(Object.keys(props.players).length > 0){
    avgRanking = sumValues(props.players)/Object.keys(props.players).length;
  };

  const [ranking, setRanking] = useState(0);
  const [len, setLen] = useState(0);
  let [players, setPlayers] = useState([]);
  
  useEffect(() => {
    if (props.players) {
      Object.entries(props.players).forEach(([key, value]) => {
        players.push([key, value]);
      });
      
      setLen(players.length);
      setRanking(avgRanking);
      setPlayers(players);
      players = [];
    }
  }, []);

  return (
    <div className="board-card">
      <div className="board-card-id">
        <div className="card-id">{props.id}</div>
      </div>
      <div className="board-card-ranking">
        {ranking > 2600 ? (
          <div className="card-ranking high">{ranking}</div>
        ) : ranking > 2000 ? (
          <div className="card-ranking medium-high">{ranking}</div>
        ) : ranking > 1500 ? (
          <div className="card-ranking medium">{ranking}</div>
        ) : ranking > 1000 ? (
          <div className="card-ranking medium-low">{ranking}</div>
        ) : (
          <div className="card-ranking low">{ranking}</div>
        )}
      </div>
      <div className="board-card-name">
        <div className="card-name">Nazwa gry</div>
      </div>
      <div className="board-card-players">
        {players.map((player, i) => (
          <div className="player-name" key={i}>
            {player[0]}
          </div>
        ))}
        {len === 3 && (
          <>
            <div className="player-name">-</div>
          </>
        )}
        {len === 2 && (
          <>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
          </>
        )}
        {len === 1 && (
          <>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
          </>
        )}
        {len === 0 && (
          <>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
