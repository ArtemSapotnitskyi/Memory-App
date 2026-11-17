import { create } from "zustand";
import { User, authService } from "../api/services/authService";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(email, password);
      set({ user: data.user });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      set({ isInitialized: true, user: null });
      return;
    }

    try {
      const data = await authService.getMe();
      set({ user: data.user, isInitialized: true });
    } catch (error) {
      set({ user: null, isInitialized: true });
    }
  },
}));
