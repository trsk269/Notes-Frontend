"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoArchiveOutline } from "react-icons/io5";
import Results from "../../src/components/modules/Results";
import { Note } from "../../src/types/note";

export default function ArchivePage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleEditNote = (note: Note) => {
    router.push(`/note/edit/${note._id}`);
  };

  return (
    <main className="min-h-screen w-full bg-[#F9FAFB] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col gap-6 py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-3 bg-white text-gray-600 hover:text-yellow-400 hover:bg-yellow-50 rounded-2xl transition-all duration-300 shadow-sm border border-gray-100/50"
            >
              <IoArrowBack size={22} />
            </button>
            <h1 className="text-2xl font-black text-[#1F2937]">Archive</h1>
          </div>

          <div className="p-6 bg-white border border-gray-100/80 rounded-[2rem] shadow-xl shadow-yellow-100/20 flex items-center gap-4 animate-in zoom-in-95 duration-700">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center shrink-0">
              <IoArchiveOutline size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1F2937]">
                Archived Notes
              </h2>
              <p className="text-sm text-gray-400 font-medium">
                Notes stored for later
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Results
            onNoteClick={handleEditNote}
            refreshKey={0}
            filter="archive"
          />
        </div>
      </div>
    </main>
  );
}
