import Result from "./Result";

const Results = (props) => {
  const results = [];
  let i = 0;
  console.log(props);
  if (props.roundResults) {
    const gameRes = props.roundResults[1];
    for (const [key, value] of Object.entries(props.roundResults[0])) {
      console.log(key);
      console.log(gameRes[key]);
      console.log(props.roundResults[2][i]);
      results.push({
        displayName: key,
        points: value,
        sum: gameRes[key],
        cards: props.roundResults[2][i],
      });
      i++;
    }
    results.sort((x, y) => (x.sum > y.sum ? 1 : -1));
  }

  if (props.gameResults) {
    const gameRes = props.gameResults[1];
    for (const [key, value] of Object.entries(props.gameResults)) {
      results.push({
        displayName: key,
        points: value,
        sum: gameRes[key],
        cards: props.roundResults[2][i],
      });
      i++;
    }
    results.sort((x, y) => (x.sum > y.sum ? 1 : -1));
  }

  return (
    <div className="results-box">
      <div className="results-container">
        {results.map((row, index) => (
          <Result
            pos={index + 1}
            name={row.displayName}
            points={row.points}
            sum={row.sum}
            cards={row.cards}
            mmr={row.mmr}
          ></Result>
          //   <>
          //     <div className="results-pos">{index + 1}</div>
          //     <div className="results-name">{row.displayName}</div>
          //     <div className="results-points">{row.points}</div>
          //     <div className="results-sum">{row.sum}</div>
          //     <div className="mini-card-flexbox">
          //       {row.cards.map((card, i) => (
          //         <div id="mini-card-wrapper">
          //           <Card
          //             cheat={true}
          //             value={card.text}
          //             suit={card.suit}
          //             key={i + card.text + card.suit}
          //           />
          //         </div>
          //       ))}
          //     </div>
          //   </>
        ))}
      </div>
    </div>
  );
};

export default Results;
