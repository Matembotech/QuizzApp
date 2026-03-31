/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

/**
 * Base Axios instance for interacting with the backend API.
 * The baseURL should point to your backend server (e.g., http://localhost:5000/api).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add auth token (if using local storage or clerk token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default api;
