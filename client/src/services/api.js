import axios from "axios";

const api = axios.create({
  baseURL: "https://scentsation-self.vercel.app/api",
});

export default api;