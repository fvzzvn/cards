const Board = (props) => {
  const ranking = Math.floor(800 + Math.random() * (3200 - 800));

  return (
    <div className="board-card">
      <div className="board-card-id">
        <div className="card-id">{props.id}</div>
      </div>
      <div className="board-card-ranking">
        {(ranking > 2600) ? (<div className="card-ranking high">{ranking}</div>) : (ranking > 2000) ? (<div className="card-ranking medium-high">{ranking}</div>) : ((ranking > 1500) ? (<div className="card-ranking medium">{ranking}</div>) : (((ranking > 1000) ? (<div className="card-ranking medium-low">{ranking}</div>) : (<div className="card-ranking low">{ranking}</div>)))) }
      </div>
      <div className="board-card-name">
        <div className="card-name">Nazwa gry</div>
      </div>
      <div className="board-card-players">
        <div className="player-1">player1</div>
        <div className="player-2">player2</div>
        <div className="player-3">player3</div>
        <div className="player-4">-</div>
      </div>
    </div>
  );
};

export default Board;
