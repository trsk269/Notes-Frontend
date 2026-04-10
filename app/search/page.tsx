"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  IoChevronBack,
  IoSearchOutline,
  IoCloseOutline,
} from "react-icons/io5";
import Results from "../../src/components/modules/Results";
import { Note } from "../../src/types/note";

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const handleBack = () => {
    router.back();
  };

  const handleEditNote = (note: Note) => {
    router.push(`/note/edit/${note._id}`);
  };

  return (
    <main className="h-screen w-full bg-[#FAFAF8] flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-md h-full flex flex-col">
        {/* ── Dark hero header ── */}
        <div className="bg-[#1A1A1A] px-5 pt-5 pb-6 flex-shrink-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={handleBack}
              className="w-[34px] h-[34px] rounded-[11px] flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <IoChevronBack size={16} color="rgba(255,255,255,0.6)" />
            </button>
            <span className="text-[11px] font-bold text-white/35 uppercase tracking-widest">
              Search
            </span>
            <div className="w-[34px]" />
          </div>

          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[14px] flex items-center pointer-events-none">
              <IoSearchOutline size={17} color="rgba(255,255,255,0.35)" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your notes…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-[42px] pr-[42px] py-[12px] rounded-[14px] text-[14px] font-semibold text-white outline-none tracking-tight placeholder:font-normal transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                caretColor: "#fff",
              }}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute inset-y-0 right-0 pr-[14px] flex items-center active:scale-90 transition-transform"
              >
                <IoCloseOutline size={17} color="rgba(255,255,255,0.4)" />
              </button>
            )}
          </div>
        </div>

        {/* ── Scrollable results ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
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
