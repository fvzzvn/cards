import GameResult from "./GameResult";
import { Button } from "react-bootstrap";

const GameResults = (props) => {
  console.log("GAME RESULTS PROPS");
  console.log(props);
  const results = [];

  if (props.gameResults) {
    for (const [key, value] of Object.entries(props.gameResults[0])) {
      results.push({
        displayName: key,
        points: value,
        oldRanking: props.gameResults[1][key],
        newRanking: props.gameResults[2][key]["item1"],
      });
    }
    results.sort((x, y) => (x.points > y.points ? 1 : -1));
    console.log("results:" + results);
  }

  return (
    <div className="game-results-wrapper">
      <div className="game-results-box">
        <div className="game-results-label-grid">
          <div className="game-results-label">
            <div className="label-text">miejsce</div>
          </div>
          <div className="game-results-label">
            <div className="label-text">gracz</div>
          </div>
          <div className="game-results-label">
            <div className="label-text">punkty</div>
          </div>
          <div className="game-results-label">
            <div className="label-text">ranking</div>
          </div>
          <div className="game-results-label">
            <div className="label-text">zmiana</div>
          </div>
          <div className="game-results-label">
            <div className="label-text">nowy</div>
          </div>
        </div>
        <div className="game-results-container">
          {results.map((row, index) => (
            <GameResult
              pos={index + 1}
              name={row.displayName}
              points={row.points}
              oldRanking={row.oldRanking}
              newRanking={row.newRanking}
            />
          ))}
        </div>
      </div>
      <Button
              id="leave"
              variant="secondary"
              onClick={(e) => {
                props.setGo(!e);
                props.handleExitGame();
              }}>Wyjdź</Button>
    </div>
    
  );
};

export default GameResults;
