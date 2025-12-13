import axios from "axios";

const API = axios.create({
  baseURL: "https://sports-stats-backend-cp6t.vercel.app/api",
  timeout: 10000,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
