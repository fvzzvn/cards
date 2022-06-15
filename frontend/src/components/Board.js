import React, { useEffect, useState } from "react";

const Board = (props) => {
  const [ranking, setRanking] = useState(
    Math.floor(800 + Math.random() * (3200 - 800))
  );
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (props.ranking) {
      setRanking(props.ranking);
    }
    if (props.participants) {
      setLen(props.participants.length);
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
        {props.participants.map((player, i) => (
          <div className="player-name" key={i}>
            {player}
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
