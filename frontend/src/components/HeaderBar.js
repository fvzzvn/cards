import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { resetCredentials } from "../slices/userCredentials";

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogOut = () => {
    dispatch(resetCredentials());
    dispatch(logout()).then(history("/"));
  };

  return (
    <div className="header-bar-container">
      <div className="logout-wrapper">
        <Button className="logout-button" onClick={handleLogOut}>
          Wyloguj się
        </Button>
      </div>
      <div className="header-bar-logo"></div>
      {props.game && (
        <div className="leave-wrapper">
          <Button className="leave-button" onClick={(e) => {props.setGo(!e)}}>Opuść stół</Button>
        </div>
      )}
      {props.username && (
      <div className="details-box">
        <div className="username-box">
          <div className="username">{props.username}</div>
        </div>
        <div className="icon-box">
          <div className="icon"></div>
        </div>
        </div>)}
    </div>
  );
};

export default HeaderBar;
