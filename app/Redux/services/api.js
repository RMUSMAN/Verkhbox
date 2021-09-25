import axios from "axios";
const baseURL = "https://p578382.mittwaldserver.info/api";

const API = axios.create({
  baseURL,
  timeout: 60000,
});

export default API;

