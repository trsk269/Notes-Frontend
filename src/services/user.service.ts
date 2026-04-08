import { apiFetch } from "./api";

export const updateProfile = (data: {
  name?: string;
  profilePic?: string;
  username?: string;
}) =>
  apiFetch("/users/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteAccount = () =>
  apiFetch("/users", {
    method: "DELETE",
  });
