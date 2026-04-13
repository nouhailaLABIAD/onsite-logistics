import axios from "axios";
import store from "../redux/store";

// 👉 Base URL de ton backend NestJS
const AuthAPI = axios.create({
  baseURL: "http://192.168.11.133:3000", // change si ton IP change
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// 🔥 INTERCEPTOR
AuthAPI.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default AuthAPI;