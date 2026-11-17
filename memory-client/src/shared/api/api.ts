import axios, { AxiosError } from "axios";

export const NEXT_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004/api";

export const apiClient = axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Add a token to each request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);
