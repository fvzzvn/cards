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
import { clearMessage } from "../slices/message";
import { getBoards } from "../slices/boards";
import { getUserCredentials } from "../slices/userCredentials";

const Home = () => {
  const dispatch = useDispatch();
  //REDUX STATES
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { inGame } = useSelector((state) => state.game.inGame);
  const { boards } = useSelector((state) => state.boards);
  const participants = useSelector((state) => state.boards.participants);
  const mmrs = useSelector((state) => state.boards.mmrs);
  const username = useSelector((state) => state.userCredentials.userName);
  const userId = useSelector((state) => state.userCredentials.userId);
  //COMPONENT STATES
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [go, setGo] = useState(false);
  // const { message } = useSelector((state) => state.message);  <--- FUTURE ERROR HANDLING?

  useEffect(() => {
    dispatch(clearMessage());
    setLoading(true);
    dispatch(getBoards())
      .unwrap()
      .then(() => {})
      .catch(() => {});
    dispatch(getUserCredentials())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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

  const handleGo = () => {
    setGo(!go);
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
                    Zaloguj si??
                  </Button>
                )}
                {showRegisterButton && (
                  <Button variant="secondary" onClick={handleRegisterClick}>
                    Utw??rz nowe konto
                  </Button>
                )}
                <div />
              </div>
            </div>
          </div>
        </div>
      ) : isLoggedIn && loading ? (
        <span className="board-loader spinner-border spinner-border-sm"></span>
      ) : isLoggedIn && !loading && !inGame && !go ? (
        <>
          <HeaderBar username={username}></HeaderBar>
          <div className="home-boards-bg">
            <div className="home-boards-title">sto??y</div>
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
                Rozpocz??te
              </ToggleButton>
              <Button
                variant="secondary"
                className="home-board-fliter"
                onClick={handleGo}
              >
                Stw??rz now?? gr??
              </Button>
              <Boards
                boards={boards}
                mmrs={mmrs}
                participants={participants}
              ></Boards>
            </div>
          </div>
        </>
      ) : (
        go && (
          <>
            <HeaderBar setGo={setGo} username={username} game={true}></HeaderBar>
            <Game username={username}></Game>
          </>
        )
      )}
    </div>
  );
};

export default Home;
