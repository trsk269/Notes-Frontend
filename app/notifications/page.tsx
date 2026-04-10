"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoNotificationsOutline } from "react-icons/io5";
import Results from "../../src/components/modules/Results";
import { Note } from "../../src/types/note";

export default function NotificationsPage() {
  const router = useRouter();

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
        <div className="bg-[#1A1A1A] px-5 pt-5 pb-7 flex-shrink-0">
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
              Notifications
            </span>
            <div className="w-[34px]" />
          </div>

          {/* Headline + descriptor */}
          <div className="flex items-center gap-3">
            <div
              className="w-[42px] h-[42px] rounded-[14px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <IoNotificationsOutline size={20} color="rgba(255,255,255,0.6)" />
            </div>
            <div>
              <h1 className="text-[20px] font-extrabold text-white tracking-tight leading-tight">
                Deadlines
              </h1>
              <p className="text-[11px] text-white/35 mt-0.5">
                Notes with active reminders
              </p>
            </div>
          </div>
        </div>

        {/* ── Scrollable results ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Results
            onNoteClick={handleEditNote}
            refreshKey={0}
            filter="deadline"
          />
        </div>
      </div>
    </main>
  );
}
