import { create } from "zustand";
import { getMe } from "../services/auth.service";

export interface AuthUser {
  id: string;
  email: string;
  username: string | null;
  authProvider: "local" | "google";
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  initializeAuth: async () => {
    set({ isLoading: true });

    const token = localStorage.getItem("token");

    if (!token) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }

    try {
      const res = await getMe();

      set({
        user: res.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
