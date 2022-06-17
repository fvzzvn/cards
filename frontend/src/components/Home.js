import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../custom.scss";
import Button from "react-bootstrap/Button";
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
  //REDUX
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { inGame } = useSelector((state) => state.game.inGame);
  const { boards } = useSelector((state) => state.boards);
  const participants = useSelector((state) => state.boards.participants);
  const mmrs = useSelector((state) => state.boards.mmrs);
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
  }

  const handleAsk = () => {
    dispatch(getUserCredentials())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

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
      ) : (isLoggedIn && loading) ? (
        <span className="board-loader spinner-border spinner-border-sm"></span>
      ) : (isLoggedIn && !inGame && !go) ? (
        <>
          <HeaderBar></HeaderBar>
          <Boards
            boards={boards}
            mmrs={mmrs}
            participants={participants}
          ></Boards>
        </>
      ) : ( go && (
        <Game></Game>
      )
      )}
      <Button onClick={handleGo}>GO!!!</Button>
      <Button onClick={handleAsk}>Ask for credentials</Button>
    </div>
  );
};

export default Home;
