/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

/**
 * Base Axios instance for interacting with the backend API.
 * The baseURL should point to your backend server (e.g., http://localhost:5000/api).
 */
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://quizzapp-1-k5ls.onrender.com/api",
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

// Response interceptor to handle rate limiting (429)
api.interceptors.response.use(
  (response) => response,
  (error: any) => {
    if (error.response?.status === 429) {
      const message =
        error.response.data?.message || "Too many attempts. Try again later.";
      const rateLimitError = new Error(message);
      (rateLimitError as any).isRateLimit = true;
      (rateLimitError as any).rateLimitMessage = message;
      return Promise.reject(rateLimitError);
    }
    return Promise.reject(error);
  },
);

export default api;
