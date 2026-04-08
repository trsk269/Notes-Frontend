import { apiFetch } from "./api";

export const getNotes = (page = 1, limit = 20, search = "") => {
  let url = `/notes?page=${page}&limit=${limit}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  return apiFetch(url);
};

export const deleteNote = (noteId: string) =>
  apiFetch(`/notes/${noteId}`, {
    method: "DELETE",
  });

export interface NotePayload {
  title?: string;
  notes?: string;
  theme?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  notifyAt?: string | null;
}

export const createNote = (payload: NotePayload) =>
  apiFetch("/notes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getNoteById = (id: string) => apiFetch(`/notes/${id}`);

export const updateNote = (id: string, payload: Partial<NotePayload>) =>
  apiFetch(`/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
