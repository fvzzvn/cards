import Board from "./Board.js";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";

const Boards = () => {
  return (
    <div className="home-boards-bg">
      <div className="home-boards-title">stoły</div>
      <div className="home-boards-container">
        <ToggleButton variant="outline-primary" className="home-board-fliter filter">Rankingowe</ToggleButton>
        <ToggleButton variant="outline-primary" className="home-board-fliter filter">Nierankingowe</ToggleButton>
        <ToggleButton variant="outline-primary" className="home-board-fliter filter">Wolne miejsca</ToggleButton>
        <ToggleButton variant="outline-primary" className="home-board-fliter filter">Rozpoczęte</ToggleButton>
        <Button variant="secondary" className="home-board-fliter">Stwórz nową grę</Button>
        {[...Array(17)].map((e, i) => (
          <Board key={i}> </Board>
        ))}
      </div>
    </div>
  );
};

export default Boards;
