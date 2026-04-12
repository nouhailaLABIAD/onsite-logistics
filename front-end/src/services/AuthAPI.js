import axios from "axios";

// 👉 Base URL de ton backend NestJS
const AuthAPI = axios.create({
  baseURL: "http://192.168.1.237:3000", // change si ton IP change
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AuthAPI;