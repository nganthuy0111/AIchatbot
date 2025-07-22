import axios from "axios";

const instance = axios.create({
  baseURL: "https://be-edulaw-production.up.railway.app/api",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
