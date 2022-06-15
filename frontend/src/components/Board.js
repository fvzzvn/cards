import React, { useEffect, useState } from "react";

const Board = (props) => {
  const [loading, setLoading] = useState(false);
  const [ranking, setRanking] = useState(
    Math.floor(800 + Math.random() * (3200 - 800))
  );
  const [participants, setParticipants] = useState(["-","-","-","-"]);

  useEffect(() => {
    setLoading(true);
    if (props.ranking) {
      setRanking(props.ranking);
    }
    while (props.participants.length < 4) {
      props.participants.push("-");
    }
    setParticipants(props.participants);
    setLoading(false);
  }, [props.ranking, props.participants]);

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
        {loading && (
          <span className="board-loader spinner-border spinner-border-sm"></span>
        )}
        {!loading &&
          participants &&
          participants.map((player, i) => (
            <div className="player-name" key={i}>
              {player}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Board;
