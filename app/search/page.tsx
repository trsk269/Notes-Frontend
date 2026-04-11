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
  const [isDesktop, setIsDesktop] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

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
    <main className="h-screen w-full bg-[#FAFAF8] flex flex-col items-center lg:items-stretch overflow-hidden overflow-y-auto">
      <div
        className={`w-full ${isDesktop ? "max-w-none px-12 pt-12" : "max-w-md"} h-full flex flex-col`}
      >
        {/* ── Mobile header ── */}
        {!isDesktop && (
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
        )}

        {/* ── Desktop header ── */}
        {isDesktop && (
          <div className="flex flex-col mb-10">
            <h1 className="text-[42px] font-black text-[#1A1A1A] tracking-tightest leading-none">
              Search
            </h1>
            <p className="text-[#B0ADA4] text-[16px] font-medium mt-3 max-w-lg mb-8">
              Find anything across your entire digital workspace. Search through
              titles, contents, and tags.
            </p>

            {/* Desktop search input */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <IoSearchOutline size={22} className="text-[#1A1A1A]/30" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type to search notes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-14 pr-12 py-5 rounded-2xl text-[18px] font-bold text-[#1A1A1A] bg-white border border-[#EDECE6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] outline-none tracking-tight placeholder:text-[#B0ADA4] placeholder:font-medium transition-all focus:border-[#1A1A1A]/20"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center active:scale-90 transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center hover:bg-[#E8E8E2] transition-colors">
                    <IoCloseOutline size={18} className="text-[#1A1A1A]/60" />
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Scrollable results ── */}
        <div
          className={`flex-1 ${isDesktop ? "px-0 pb-12 mt-4" : "px-4 py-4"}`}
        >
          <Results
            onNoteClick={handleEditNote}
            refreshKey={0}
            search={debouncedQuery}
            isDesktop={isDesktop}
          />
        </div>
      </div>
    </main>
  );
}
