import React, { useState, useEffect } from "react";
import Board from "./Board.js";
import UserService from "../services/user.service";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Game from "./Game.js";

const Boards = () => {
  const [content, setContent] = useState("");
  const [boards, setBoards] = useState("");
  const [rankings, setRankings] = useState("");
  const [participants, setParticipants] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
        setBoards(content["boards"]);
        setRankings(content["mmrs"]);
        setParticipants(content["participants"]);
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
        setLoading(false);
      }
    );
  }, []);

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
        {loading && (
                    <span className="board-loader spinner-border spinner-border-sm"></span>
                  )}
        {!loading &&
          boards.map((item, i) => (
            <Board
              id={item.id}
              key={i}
              ranking={rankings[i]}
              participants={participants[i]}
            ></Board>
          ))}
        {[45, 92, 111, 112, 166, 201, 222, 295, 300, 397].map((e, i) => (
          <Board id={e} key={i}></Board>
        ))}
      </div>
      {/* <Game></Game> */}
    </div>
  );
};

export default Boards;
