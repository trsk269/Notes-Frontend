"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LuBellPlus } from "react-icons/lu";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscSymbolColor } from "react-icons/vsc";
import { PiTextAUnderlineBold } from "react-icons/pi";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

import { noteSchema } from "../../validation/note.schema";
import {
  createNote,
  getNoteById,
  updateNote,
} from "../../services/notes.service";

interface AddorUpdateNoteProps {
  mode: "add" | "update";
  noteId?: string;
}

const AddorUpdateNote = ({ mode, noteId }: AddorUpdateNoteProps) => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    notes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH NOTE FOR EDIT ---------------- */
  useEffect(() => {
    if (mode === "update" && noteId) {
      getNoteById(noteId).then((res) => {
        console.log("NOTE API RESPONSE 👉", res);
        setForm({
          title: res.note.title,
          notes: res.note.notes,
        });
      });
    }
  }, [mode, noteId]);

  /* ---------------- SAVE HANDLER ---------------- */
  const handleSave = async () => {
    setError(null);

    try {
      noteSchema.parse(form);
      setLoading(true);

      if (mode === "add") {
        await createNote(form);
      } else if (mode === "update" && noteId) {
        await updateNote(noteId, form);
      }

      router.push("/");
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full min-h-screen bg-black p-4">
      <div className="flex items-center justify-between">
        <div
          onClick={() => router.back()}
          className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer"
        >
          <IoMdArrowBack className="text-white" />
        </div>

        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <LuBellPlus className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <RiInboxArchiveLine className="text-white" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="w-full flex flex-col overflow-y-scroll mt-12">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 outline-none text-white text-3xl bg-transparent"
        />

        <input
          type="text"
          placeholder="Note"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="p-2 outline-none text-white text-xl bg-transparent"
        />
      </div>

      <div className="flex items-center justify-between fixed bottom-4 left-4 right-4">
        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <MdAdd className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <PiTextAUnderlineBold className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <VscSymbolColor className="text-white" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer">
            <BsThreeDotsVertical className="text-white" />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="text-white"
          >
            {mode === "add" ? "Add Note" : "Update Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddorUpdateNote;
