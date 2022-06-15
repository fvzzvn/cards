import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:7297/api/";

const getBoards = () => {
  return axios
    .get(API_URL + "boards")
    .then((response) => {
      return response.data;
  });
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
  getBoards,
  getUserBoard,
  getAdminBoard,
};

export default userService;
