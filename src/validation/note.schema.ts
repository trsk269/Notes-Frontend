import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  notes: z.string().min(1, "Note is required"),
});
