import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../custom.scss";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Login from "./Login.js";
import Register from "./Register.js";
import CloseButton from "react-bootstrap/CloseButton";
import Boards from "./Boards.js";
import HeaderBar from "./HeaderBar.js";
import Game from "./Game.js";
import NewBoard from "./NewBoard.js";
import { clearMessage } from "../slices/message";
// import { getBoards } from "../slices/boards";
import { getUserCredentials } from "../slices/userCredentials";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import { create } from "yup/lib/Reference";

const Home = () => {
  const dispatch = useDispatch();
  //REDUX STATES
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { inGame } = useSelector((state) => state.game.inGame);
  // const { boards } = useSelector((state) => state.boards);
  // const participants = useSelector((state) => state.boards.participants);
  // const mmrs = useSelector((state) => state.boards.mmrs);
  // const players = useSelector((state) => state.boards);
  const username = useSelector((state) => state.userCredentials.userName);
  const userId = useSelector((state) => state.userCredentials.userId);
  //COMPONENT STATES
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [go, setGo] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(0);
  // const { message } = useSelector((state) => state.message);  <--- FUTURE ERROR HANDLING?
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    dispatch(getUserCredentials());
  }, [dispatch]);

  const handleLoginClick = () => {
    setShowLogin((showLogin) => !showLogin);
    setShowLoginButton((showLoginButton) => !showLoginButton);
    setShowRegisterButton((showRegisterButton) => !showRegisterButton);
  };

  const handleRegisterClick = () => {
    setShowRegister((showRegister) => !showRegister);
    setShowLoginButton((showLoginButton) => !showLoginButton);
    setShowRegisterButton((showRegisterButton) => !showRegisterButton);
  };

  const handleExitButton = () => {
    setShowLogin((showLogin) => false);
    setShowRegister((showRegister) => false);
    setShowLoginButton((showLoginButton) => true);
    setShowRegisterButton((showRegisterButton) => true);
  };

  const handleGo = (id) => {
    setCurrentBoardId((currentBoardId) => id);
    setGo(!go);
    setShowCreateBoard((showCreateBoard) => false);
  };

  const handleShowCreateBoard = () => {
    setShowCreateBoard((showCreateBoard) => true);
  };

  const handleExitCreateBoard = () => {
    setShowCreateBoard((showCreateBoard) => false);
    dispatch(clearMessage());
  };
  return (
    <div className="cards-bg">
      {!isLoggedIn ? (
        <div className="home-wrapper">
          <div className="home-container">
            <div className="home-logo"></div>
            <div className="buttons-wrapper">
              {showLogin || showRegister ? (
                <div className="x-holder">
                  <CloseButton variant="white" onClick={handleExitButton} />
                </div>
              ) : (
                <div />
              )}
              <div className="home-buttons-container">
                {showLogin && <Login></Login>}
                {showRegister && <Register></Register>}
                {showLoginButton && (
                  <Button variant="primary" onClick={handleLoginClick}>
                    Zaloguj się
                  </Button>
                )}
                {showRegisterButton && (
                  <Button variant="secondary" onClick={handleRegisterClick}>
                    Utwórz nowe konto
                  </Button>
                )}
                <div />
              </div>
            </div>
          </div>
        </div>
      ) : // ) : isLoggedIn && loading ? (
      // <span className="board-loader spinner-border spinner-border-sm"></span>
      isLoggedIn && !inGame && !go ? (
        <>
          <HeaderBar username={username}></HeaderBar>
          <div className="home-boards-bg">
            <div className="home-boards-title">stoły</div>
            <div className="home-boards-container">
              <ToggleButton
                variant="outline-primary"
                className="home-board-fliter filter"
              >
                Szczury
              </ToggleButton>
              <ToggleButton
                variant="outline-primary"
                className="home-board-fliter filter"
              >
                Smoki
              </ToggleButton>
              <ToggleButton
                variant="outline-primary"
                className="home-board-fliter filter"
              >
                Kruki
              </ToggleButton>
              <ToggleButton
                variant="outline-primary"
                className="home-board-fliter filter"
              >
                Wolne miejsca
              </ToggleButton>
              {/* <Button
                variant="secondary"
                className="home-board-fliter"
                onClick={(e) => handleGo(44, e)}
              >
                Board 1
              </Button>
              <Button
                variant="secondary"
                className="home-board-fliter"
                onClick={(e) => handleGo(43, e)}
              >
                Board 2
              </Button> */}
              <Button
                variant="secondary"
                className="home-board-fliter"
                onClick={handleShowCreateBoard}
              >
                Stwórz nową grę
              </Button>
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
                Rankingowe
              </ToggleButton>
              <ToggleButton
                variant="outline-primary"
                className="home-board-fliter filter"
              >
                Rozpoczęte
              </ToggleButton>
              <ToggleButton
                variant="outline-primary"
                className="home-board-fliter filter"
              >
                Sortowanie: ID
              </ToggleButton>
              <div></div>
              <Boards
                // boards={boards}
                handleGo={handleGo}
                connection={connection}
                // mmrs={mmrs}
                // participants={participants}
              ></Boards>
            </div>
          </div>
          {showCreateBoard && !go && (
            <div className="dim-screen">
              <div className="new-board-wrapper">
                <div className="new-board-x-holder">
                  <CloseButton
                    variant="white"
                    onClick={handleExitCreateBoard}
                  />
                </div>
                <NewBoard
                  connection={connection}
                  handleGo={handleGo}
                ></NewBoard>
              </div>
            </div>
          )}
        </>
      ) : (
        go && (
          <>
            <HeaderBar
              connection={connection}
              setGo={setGo}
              username={username}
              game={true}
            ></HeaderBar>
            <Game username={username} boardId={currentBoardId}></Game>
          </>
        )
      )}
    </div>
  );
};

export default Home;
