import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:7297/api/";

const getBoards = () => {
  return axios.get(API_URL + "boards").then((response) => {
    return response.data;
  });
};

const getUserCredentials = () => {
  return axios
    .get(API_URL + "authentication", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const createBoard = (boardName, boardType, boardMode, boardPublic) => {
  console.log({"boardName": boardName, "boardType": boardType, "boardMode": boardMode, "boardPublic": boardPublic});
  return axios
    .post(API_URL + "boards", {
      "boardName": boardName,
      "boardType": 1,
      "boardMode": 1,
    })
    .then((response) => {
      console.log("created board type:" + boardType, +" mode: " + boardMode);
      console.log(response.data);
      return response.data;
    });
  // const response = await axios.post(API_URL + "boards", {
  //   // "boardName": boardName,
  //   "boardType": boardType,
  //   "boardMode": boardMode,
  // });
  // return response.data;
};

const userService = {
  getBoards,
  getUserCredentials,
  getAdminBoard,
  createBoard,
};

export default userService;
