import React, { useState, useEffect } from "react";
import Board from "./Board.js";
// import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
// import Game from "./Game.js";
// import { clearMessage } from "../slices/message";
// import { getBoards } from "../slices/boards";

const Boards = (props) => {
  return (
    <div className="home-boards-bg">
      <div className="home-boards-title">stoły</div>
      <div className="home-boards-container">
        <ToggleButton
          variant="outline-primary"
          className="home-board-fliter filter"
        >
          Rankingowe
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          className="home-board-fliter filter"
        >
          Nierankingowe
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          className="home-board-fliter filter"
        >
          Wolne miejsca
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          className="home-board-fliter filter"
        >
          Rozpoczęte
        </ToggleButton>
        <Button variant="secondary" className="home-board-fliter">
          Stwórz nową grę
        </Button>
        {!props.loading ? (
          props.boards.map((item, i) => (
            <Board
              id={item.id}
              key={i}
              ranking={props.mmrs[i]}
              participants={props.participants[i]}
            ></Board>
          ))
        ) : (
          <span className="board-loader spinner-border spinner-border-sm"></span>
        )}
        {[45, 92, 111, 112, 166, 201, 222, 295, 300, 397].map((e, i) => (
          <Board
            id={e}
            key={i}
            participants={['username23','player606','cards102']}
          ></Board>
        ))}
      </div>
    </div>
  );
};

export default Boards;
