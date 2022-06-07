import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "../styles/Home.css";

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
          <div className="buttons-container">
            <button className="home-button yellow"> Zaloguj się</button>
            <button className="home-button red"> Utwórz nowe konto</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
