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

const createBoard = () => {
  return axios.post(API_URL + "boards", {
    "boardType": 0,
    "boardMode": 0,
  }).then((response) => {
    return response.data;
  })
}

const addParticipant = (userId, boardId) => {
  return axios.post(API_URL + "Participants", {
    "userId": userId,
    "boardId": boardId,
  }).then((response) => {
    console.log("addparticipant response data for " + API_URL + "Participants(" + userId + ", " + boardId + ") call")
    console.log(response.data)
    return response.data;
  })
}

const userService = {
  getBoards,
  getUserCredentials,
  getAdminBoard,
  createBoard,
  addParticipant,
};

export default userService;
