import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "../custom.scss";
import Button from "react-bootstrap/Button";
import Login from "./Login.js";
import Register from "./Register.js";
import CloseButton from "react-bootstrap/CloseButton";

const Home = () => {
  const [content, setContent] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);

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

  return (
    <header>
      <div className="home-wrapper">
        <div className="home-container">
          <div className="home-logo"></div>
          <div className="home-buttons-container">
            <Login showLogin={showLogin}></Login>
            <Register showRegister={showRegister}></Register>
            {showLoginButton ? (
              <Button variant="primary" onClick={handleLoginClick}>
                Zaloguj się
              </Button>
            ) : (
              <p />
            )}
            {showRegisterButton ? (
              <Button variant="secondary" onClick={handleRegisterClick}>
                {" "}
                Utwórz nowe konto
              </Button>
            ) : (
              <p />
            )}
            {showLogin || showRegister ? (
              <div className="x-holder">
                <CloseButton variant="white" onClick={handleExitButton}/>
              </div>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
