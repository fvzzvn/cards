import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../custom.scss";
import Button from "react-bootstrap/Button";
import Login from "./Login.js";
import Register from "./Register.js";
import CloseButton from "react-bootstrap/CloseButton";
import Boards from "./Boards.js";
import HeaderBar from "./HeaderBar.js";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // FUTURE ADMIN AND LOGOUT COMPONENTS
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  // const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const logOut = useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   } else {
  //     setShowAdminBoard(false);
  //   }
  //   EventBus.on("logout", () => {
  //     logOut();
  //   });
  //   return () => {
  //     EventBus.remove("logout");
  //   };
  // }, [currentUser, logOut]);


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
      ) : (
        <>
          <HeaderBar></HeaderBar>
          <Boards></Boards>
        </>
      )}
    </div>
  );
};

export default Home;
