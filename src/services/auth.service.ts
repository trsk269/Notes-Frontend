import { apiFetch } from "./api";

export const register = (email: string, password: string) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const login = (email: string, password: string) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const verifyMFA = (userId: string, token: string) =>
  apiFetch("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      userId, // 🔑 REQUIRED
      otp: token,
    }),
  });

export const getMe = () => apiFetch("/auth/me");
