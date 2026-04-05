"use client";
import { useState } from "react";
import NavBar from "../modules/NavBar";
import DefaultAdd from "../modules/DefaultAdd";
import Options from "../modules/Options";
import Results from "../modules/Results";
import AddorUpdateNote from "../modules/AddorUpdateNote";
import { Note } from "../../types/note";

export default function HomePage() {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openAddNote = () => {
    setEditingNote(null);
    setIsNoteOpen(true);
  };

  const openEditNote = (note: Note) => {
    setEditingNote(note);
    setIsNoteOpen(true);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen w-full bg-[#F9FAFB] flex flex-col items-center overflow-x-hidden">
      {/* Optimized content width for dashboard feel (constrained to md) */}
      <div className="w-full max-w-md flex flex-col gap-6 py-8 px-4 sm:px-6">
        <NavBar />

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <DefaultAdd onAddClick={openAddNote} />
          <Options />
        </div>

        <div className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Results onNoteClick={openEditNote} refreshKey={refreshKey} />
        </div>
      </div>

      <AddorUpdateNote
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        note={editingNote}
        onSave={handleRefresh}
      />
    </main>
  );
}
