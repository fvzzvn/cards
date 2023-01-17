const GameResult = (props) => {
  return (
    <div className="game-result-grid">
      <div className="game-results-pos">
        <div>{props.pos}</div>
      </div>
      <div className="game-results-name">
        <div>{props.name}</div>
      </div>
      <div className="game-results-points">
        <div>{props.points}</div>
      </div>
      {props.oldRanking > 2600 ? (
        <div className="game-results-old-ranking high">{props.oldRanking}</div>
      ) : props.oldRanking > 2000 ? (
        <div className="game-results-old-ranking medium-high">
          {props.oldRanking}
        </div>
      ) : props.oldRanking > 1500 ? (
        <div className="game-results-old-ranking medium">
          {props.oldRanking}
        </div>
      ) : props.oldRanking > 1000 ? (
        <div className="game-results-old-ranking medium-low">
          {props.oldRanking}
        </div>
      ) : (
        <div className="game-results-old-ranking low">{props.oldRanking}</div>
      )}
      {props.newRanking - props.oldRanking < 0 ? (
        <div className="game-results-ranking-change high">
          <div>{props.newRanking - props.oldRanking}</div>
        </div>
      ) : (
        <div className="game-results-ranking-change low">
          <div>{props.newRanking - props.oldRanking}</div>
        </div>
      )}
      {props.newRanking > 2600 ? (
        <div className="game-results-new-ranking high">{props.newRanking}</div>
      ) : props.newRanking > 2000 ? (
        <div className="game-results-new-ranking medium-high">
          {props.newRanking}
        </div>
      ) : props.newRanking > 1500 ? (
        <div className="game-results-new-ranking medium">
          {props.newRanking}
        </div>
      ) : props.newRanking > 1000 ? (
        <div className="game-results-new-ranking medium-low">
          {props.newRanking}
        </div>
      ) : (
        <div className="game-results-new-ranking low">{props.newRanking}</div>
      )}{" "}
    </div>
  );
};

export default GameResult;
