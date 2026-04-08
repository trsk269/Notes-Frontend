"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import Results from "../../src/components/modules/Results";
import { Note } from "../../src/types/note";

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debouncing logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const handleBack = () => {
    router.back();
  };

  const handleEditNote = (note: Note) => {
    router.push(`/note/edit/${note._id}`);
  };

  return (
    <main className="min-h-screen w-full bg-[#F9FAFB] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col gap-6 py-8 px-4 sm:px-6">
        {/* Header & Search Bar */}
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-3 bg-white text-gray-600 hover:text-[#7DD3FC] hover:bg-sky-50 rounded-2xl transition-all duration-300 shadow-sm border border-gray-100/50"
            >
              <IoArrowBack size={22} />
            </button>
            <h1 className="text-2xl font-black text-[#1F2937]">Search</h1>
          </div>

          <div className="relative group/search w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7DD3FC]">
              <IoSearchOutline size={22} />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your notes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border border-gray-100/80 rounded-[2rem] text-lg font-bold text-[#1F2937] outline-none shadow-xl shadow-sky-100/20 focus:border-[#7DD3FC] focus:ring-4 focus:ring-sky-100/30 transition-all duration-300 placeholder:text-gray-300"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-400 transition-colors"
              >
                <IoCloseOutline size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Results
            onNoteClick={handleEditNote}
            refreshKey={0}
            search={debouncedQuery}
          />
        </div>
      </div>
    </main>
  );
}
