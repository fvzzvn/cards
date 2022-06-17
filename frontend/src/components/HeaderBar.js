import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { getUserCredentials } from "../slices/userCredentials";
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
        <Button onClick={handleLogOut}>LOGOUT</Button>
      </div>
      <div className="header-bar-logo"></div>
      {props.username &&
        <div style={{ color: "white", fontSize: "40px" }}> {props.username}</div>
      }
    </div>
  );
};

export default HeaderBar;
