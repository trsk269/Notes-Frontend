import { apiFetch } from "./api";

export const getNotes = (page = 1, limit = 20) =>
  apiFetch(`/notes?page=${page}&limit=${limit}`);

export const deleteNote = (noteId: string) =>
  apiFetch(`/notes/${noteId}`, {
    method: "DELETE",
  });

export interface NotePayload {
  title: string;
  notes: string;
}

export const createNote = (payload: NotePayload) =>
  apiFetch("/notes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getNoteById = (id: string) => apiFetch(`/notes/${id}`);

export const updateNote = (id: string, payload: NotePayload) =>
  apiFetch(`/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
