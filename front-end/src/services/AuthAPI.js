import axios from "axios";
import store from "../redux/store";

// 👉 Base URL de ton backend NestJS
const AuthAPI = axios.create({
  baseURL: "http://172.20.10.11:3000", // change si ton IP change
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