import Card from "./Card";

const Result = (props) => {
    return (
        <div className="result-grid">
         <div className="results-pos"><div>{props.pos}</div></div>
         <div className="results-name">{props.name}</div>
         <div className="results-points"><div>{props.points}</div></div>
         <div className="results-sum"><div>{props.sum}</div></div>
         <div className="mini-card-flexbox">
           {props.cards.map((card, i) => (
             <div id="mini-card-wrapper">
               <Card
                 cheat={true}
                 value={card.text}
                 suit={card.suit}
                 key={i + card.text + card.suit}
               />
             </div>
           ))}
        </div>
        </div>
    )
}

export default Result