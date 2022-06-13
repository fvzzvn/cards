import axios from "axios";

const API_URL = "https://localhost:7297/api/";


const register = (username, email, password) => {
  return axios.post(API_URL + "authentication", {
    username,
    email,
    password,
    "displayName" : username,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "token", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;