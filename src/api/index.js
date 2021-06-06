import axios from "axios";

const api = axios.create({
  baseURL: `http://api.exchangeratesapi.io/v1/`,
});

export default api;
