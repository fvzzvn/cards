import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Board = (props) => {
  let plyers = useSelector((state) => state.boards.boards[props.iterator].players)
  plyers = Object.keys(plyers);

  let avgRanking = 0;
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
  if (Object.keys(props.players).length > 0) {
    avgRanking = sumValues(props.players) / Object.keys(props.players).length;
  }
  const [ranking, setRanking] = useState(0);
  const [len, setLen] = useState(0);
  let [players, setPlayers] = useState([]);

  useEffect(() => {
    
  },[props])

  useEffect(() => {
    if (props.players) {
      Object.entries(props.players).forEach(([key, value]) => {
        players.push([key, value]);
      });

      setLen(players.length);
      setRanking(Math.round(avgRanking));
      setPlayers(players);
      players = [];
    }
  }, []);

  return (
    <div className="board-card">
      <div className="board-card-id">{props.id}</div>
      <div className="board-card-ranked">{props.boardType === 1 ? (<>N</>) : (<>R</>)}</div>
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
        <div className="card-name">{props.boardName}</div>
      </div>
      <div className="board-card-icon-box">
        {props.boardMode === 1 ? (
          <div className="board-card-icon rat"></div>
        ) : props.boardMode === 2 ? (
          <div className="board-card-icon dragon"></div>
        ) : (
          <div className="board-card-icon raven"></div>
        )}
      </div>
      <div className="board-card-players">
        {plyers.map((player, i) => (
          <div className="player-name" key={i}>
            {player}
          </div>
        ))}
        {plyers.length === 3 && (
          <>
            <div className="player-name">-</div>
          </>
        )}
        {plyers.length === 2 && (
          <>
            <div className="player-name">-</div>
            <div className="player-name">-</div>
          </>
        )}
        {plyers.length === 1 && (
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
