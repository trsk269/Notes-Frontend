import { apiFetch } from "./api";

export const getTags = () => apiFetch("/tags");

export const createTag = (name: string) =>
  apiFetch("/tags", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

export const deleteTag = (tagId: string) =>
  apiFetch(`/tags/${tagId}`, {
    method: "DELETE",
  });
