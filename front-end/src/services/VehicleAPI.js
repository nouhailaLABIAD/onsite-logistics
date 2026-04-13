import axios from "axios";

const VehicleAPI = axios.create({
  baseURL: "http://192.168.1.237:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default VehicleAPI;