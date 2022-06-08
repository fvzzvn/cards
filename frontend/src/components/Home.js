import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "../custom.scss";
import Button from "react-bootstrap/Button";

const Home = () => {
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
    <header>
      <div className="home-wrapper">
        <div className="home-container">
          <div className="home-logo"></div>
          <div className="home-buttons-container">
            <Button variant="primary">Zaloguj się</Button>
            <Button variant="secondary"> Utwórz nowe konto</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
