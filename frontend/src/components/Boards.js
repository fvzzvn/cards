import Board from "./Board.js";

const Boards = () => {
  return (
    <div className="home-boards-bg">
      <div className="home-boards-title">stoły</div>
      <div className="home-boards-container">
        {[...Array(17)].map((e, i) => (
          <Board key={i}> </Board>
        ))}
      </div>
    </div>
  );
};

export default Boards;
