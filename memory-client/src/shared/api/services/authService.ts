import { apiClient } from "../api";

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: Date;
}

export interface AuthResponse {
  message: string;
  user: User;
  token?: string;
}

export interface GetMeResponse {
  user: User;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  },

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("token");
  },

  async getMe(): Promise<GetMeResponse> {
    const response = await apiClient.get<GetMeResponse>("/auth/me");
    return response.data;
  },
};
