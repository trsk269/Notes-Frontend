"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../modules/NavBar";
import DefaultAdd from "../modules/DefaultAdd";
import Options from "../modules/Options";
import Results from "../modules/Results";
import { Note } from "../../types/note";

export default function HomePage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  const openAddNote = () => {
    router.push("/note/add");
  };

  const openEditNote = (note: Note) => {
    router.push(`/note/edit/${note._id}`);
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
    </main>
  );
}
