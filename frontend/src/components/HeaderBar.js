import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { getUserCredentials } from "../slices/userCredentials";
import { logout } from "../slices/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userCredentials.userName);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
    setLoading(true);
    dispatch(getUserCredentials())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logout()).then(history("/"));
  };

  return (
    <div className="header-bar-container">
      <div className="logout-wrapper">
        <Button onClick={handleLogOut}>LOGOUT</Button>
      </div>
      <div className="header-bar-logo"></div>
      {loading ? (
        <span className="board-loader spinner-border spinner-border-sm"></span>
      ) : (
        <div style={{ color: "white", fontSize: "40px" }}> {username}</div>
      )}
    </div>
  );
};

export default HeaderBar;
