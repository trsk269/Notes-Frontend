"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../modules/NavBar";
import Results from "../modules/Results";
import Options from "../modules/Options";
import { Note } from "../../types/note";

export default function HomePage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTagId, setSelectedTagId] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const openAddNote = () => router.push("/note/add");
  const openEditNote = (note: Note) => router.push(`/note/edit/${note._id}`);

  return (
    <main className="min-h-screen w-full bg-[#FAFAF8] flex flex-col items-center lg:items-stretch overflow-x-hidden">
      <div
        className={`w-full ${isDesktop ? "max-w-none px-12 pt-12" : "max-w-md"} flex flex-col h-screen transition-all duration-500`}
      >
        {!isDesktop && <NavBar onAddClick={openAddNote} />}

        {isDesktop && (
          <div className="flex flex-col mb-10">
            <h1 className="text-[42px] font-black text-[#1A1A1A] tracking-tightest leading-none">
              My Notes
            </h1>
            <p className="text-[#B0ADA4] text-[16px] font-medium mt-3 max-w-lg">
              Your personal workspace for quick thoughts and long-term ideas.
              Stay focused and organized.
            </p>
          </div>
        )}

        <div
          className={`${isDesktop ? "px-0" : "px-5"} pt-1 pb-2 flex-shrink-0`}
        >
          <Options
            onSelectTag={setSelectedTagId}
            selectedTagId={selectedTagId}
          />
        </div>

        <div
          className={`flex-1 overflow-y-auto ${isDesktop ? "px-0 mt-8" : "px-5"} pb-8`}
        >
          <Results
            onNoteClick={openEditNote}
            refreshKey={refreshKey}
            tagId={selectedTagId}
            isDesktop={isDesktop}
          />
        </div>
      </div>
    </main>
  );
}
