import axios from "axios";

const api = axios.create({
  baseURL: "http://172.29.83.85:3333/",
});

export default api;
