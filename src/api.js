import axios from "axios";

const API = axios.create({
  baseURL: "https://inventorymanagementsystem-repo-3.onrender.com/api",
});

export default API;