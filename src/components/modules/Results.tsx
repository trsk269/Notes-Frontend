"use client";
import { useEffect, useRef, useState } from "react";
import Card from "../molecules/Card";
import { getNotes } from "../../services/notes.service";
import { Note } from "../../types/note";
import { IoPin, IoNotifications, IoJournal } from "react-icons/io5";

interface ResultsProps {
  onNoteClick: (note: Note) => void;
  refreshKey: number;
  search?: string;
  filter?: string;
  tagId?: string;
  isDesktop?: boolean;
}

const Column = ({ title, notes, onNoteClick, icon: Icon }: any) => (
  <div className="flex-1 flex flex-col gap-4 min-w-0">
    <div className="flex items-center gap-2 px-1 mb-2">
      <div className="w-8 h-8 rounded-lg bg-[#E8E8E2] border border-[#DEDDDA] flex items-center justify-center text-[#1A1A1A]">
        <Icon size={16} />
      </div>
      <h3 className="text-[15px] font-bold text-[#1A1A1A] tracking-tight">
        {title}
      </h3>
      <span className="ml-auto text-[11px] font-bold text-[#B0ADA4] bg-[#F5F5F0] px-2 py-0.5 rounded-full uppercase tracking-wider">
        {notes.length}
      </span>
    </div>
    <div className="flex flex-col gap-3">
      {notes.map((note: Note) => (
        <Card key={note._id} note={note} onClick={() => onNoteClick(note)} />
      ))}
      {notes.length === 0 && (
        <div className="py-10 border-2 border-dashed border-[#EDECE6] rounded-[24px] flex flex-col items-center justify-center text-center px-4 bg-[#F9F9F7]/50">
          <p className="text-[12px] font-bold text-[#C0BDB4] tracking-tight">
            Empty
          </p>
        </div>
      )}
    </div>
  </div>
);

export default function Results({
  onNoteClick,
  refreshKey,
  search = "",
  filter = "",
  tagId = "",
  isDesktop = false,
}: ResultsProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchedPagesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setNotes([]);
    setPage(1);
    setTotalPages(1);
    fetchedPagesRef.current = new Set();
    setLoading(true);
  }, [refreshKey, search, filter, tagId]);

  useEffect(() => {
    if (fetchedPagesRef.current.has(page)) return;
    fetchedPagesRef.current.add(page);
    setIsFetchingNext(true);
    getNotes(page, 20, search, filter, tagId)
      .then((res) => {
        setNotes((prev) => {
          const existingIds = new Set(prev.map((n) => n._id));
          return [
            ...prev,
            ...res.notes.filter((n: Note) => !existingIds.has(n._id)),
          ];
        });
        setTotalPages(res.totalPages);
      })
      .finally(() => {
        setIsFetchingNext(false);
        setLoading(false);
      });
  }, [page, refreshKey, search, filter, tagId]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNext && page < totalPages)
          setPage((p) => p + 1);
      },
      { rootMargin: "200px" },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isFetchingNext, page, totalPages]);

  /* ── Skeleton ── */
  if (loading && notes.length === 0) {
    return (
      <div className={`flex gap-6 pt-3 ${isDesktop ? "flex-row" : "flex-col"}`}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`bg-white border border-[#EDECE6] rounded-[24px] animate-pulse ${isDesktop ? "flex-1 h-64" : "w-full h-[110px]"}`}
          />
        ))}
      </div>
    );
  }

  /* ── Empty ── */
  if (notes.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 bg-[#F5F5F0] border border-[#EDECE6] rounded-[18px] flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect
              x="4"
              y="3"
              width="14"
              height="18"
              rx="3"
              stroke="#C0BDB4"
              strokeWidth="1.5"
            />
            <line
              x1="8"
              y1="9"
              x2="14"
              y2="9"
              stroke="#C0BDB4"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="13"
              x2="14"
              y2="13"
              stroke="#C0BDB4"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="17"
              x2="11"
              y2="17"
              stroke="#C0BDB4"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-[14px] font-bold text-[#1A1A1A] tracking-tight">
            No notes yet
          </p>
          <p className="text-[12px] text-[#B0ADA4] mt-1">
            Tap the + button to write your first one.
          </p>
        </div>
      </div>
    );
  }

  /* ── Desktop Grid Rendering ── */
  if (isDesktop) {
    const pinned = notes.filter((n) => n.isPinned);
    const reminders = notes.filter((n) => !n.isPinned && n.notifyAt);
    const others = notes.filter((n) => !n.isPinned && !n.notifyAt);

    return (
      <div className="flex gap-8 items-start">
        <Column
          title="Pinned"
          notes={pinned}
          onNoteClick={onNoteClick}
          icon={IoPin}
        />
        <Column
          title="Reminders"
          notes={reminders}
          onNoteClick={onNoteClick}
          icon={IoNotifications}
        />
        <Column
          title="Notes"
          notes={others}
          onNoteClick={onNoteClick}
          icon={IoJournal}
        />
      </div>
    );
  }

  /* ── Mobile/List Rendering ── */
  return (
    <>
      <div className="flex flex-col gap-3 pt-3">
        {notes.map((note) => (
          <Card key={note._id} note={note} onClick={() => onNoteClick(note)} />
        ))}
      </div>
      {page < totalPages && <div ref={loadMoreRef} className="h-6" />}
    </>
  );
}
