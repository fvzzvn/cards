import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./custom.scss";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";


const App = () => {

  return (
      <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/admin" element={<BoardAdmin />} />
            </Routes>
      </Router>
  );
};

export default App;
