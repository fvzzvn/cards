import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { getUserCredentials } from "../slices/userCredentials";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userCredentials.userName);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="header-bar-container">
      <div className="header-bar-logo"></div>
      {loading ? (
        <span className="board-loader spinner-border spinner-border-sm"></span>
      ) : (
        <div> {username}</div>
      )}
    </div>
  );
};

export default HeaderBar;
