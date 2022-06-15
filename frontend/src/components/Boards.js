import React, { useState, useEffect } from "react";
import Board from "./Board.js";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Game from "./Game.js";

const Boards = () => {
  const [content, setContent] = useState("");



  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="home-boards-bg">
      {console.log(content[0])};<div className="home-boards-title">stoły</div>
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
        {[
          100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
          114, 115, 116, 117,
        ].map((e, i) => (
            <Board id={e} key={i}></Board>
        ))}
        <Game></Game>
      </div>
    </div>
  );
};

export default Boards;
