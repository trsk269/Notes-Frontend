"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../modules/NavBar";
import Results from "../modules/Results";
import Options from "../modules/Options";
import { Note } from "../../types/note";

export default function HomePage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTagId, setSelectedTagId] = useState("");

  const openAddNote = () => router.push("/note/add");
  const openEditNote = (note: Note) => router.push(`/note/edit/${note._id}`);

  return (
    <main className="min-h-screen w-full bg-[#FAFAF8] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col h-screen">
        <NavBar onAddClick={openAddNote} />

        <div className="px-5 pt-1 pb-2 flex-shrink-0">
          <Options
            onSelectTag={setSelectedTagId}
            selectedTagId={selectedTagId}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <Results
            onNoteClick={openEditNote}
            refreshKey={refreshKey}
            tagId={selectedTagId}
          />
        </div>
      </div>
    </main>
  );
}
