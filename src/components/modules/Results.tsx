"use client";
import { useEffect, useState } from "react";
import Card from "../molecules/Card";
import { getNotes } from "../../services/notes.service";
import { Note } from "../../types/note";
import Link from "next/link";

export default function Result() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes()
      .then((res) => setNotes(res.notes))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  // 🔹 EMPTY STATE
  if (notes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Link
          href="/note/add"
          className="border border-gray-400 text-gray-400 px-4 py-2 rounded-md"
        >
          + Add your first note
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 gap-1 h-auto text-gray-400 p-2">
      {notes.map((note) => (
        <Card key={note._id} note={note} />
      ))}
    </div>
  );
}
