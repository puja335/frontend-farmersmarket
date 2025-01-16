import axios from "axios";

// Get token from localStorage (or Redux store/session storage)
const token = localStorage.getItem('BearerToken');
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/", // You can set baseURL once
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
