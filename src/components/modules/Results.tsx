"use client";
import { useEffect, useRef, useState } from "react";
import Card from "../molecules/Card";
import { getNotes } from "../../services/notes.service";
import { Note } from "../../types/note";

interface ResultsProps {
  onNoteClick: (note: Note) => void;
  refreshKey: number;
  search?: string;
}

export default function Results({
  onNoteClick,
  refreshKey,
  search = "",
}: ResultsProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchedPagesRef = useRef<Set<number>>(new Set());

  // Reset logic when refreshKey or search changes
  useEffect(() => {
    setNotes([]);
    setPage(1);
    setTotalPages(1);
    fetchedPagesRef.current = new Set();
    setLoading(true);
  }, [refreshKey, search]);

  useEffect(() => {
    if (fetchedPagesRef.current.has(page)) return;

    fetchedPagesRef.current.add(page);
    setIsFetchingNext(true);

    getNotes(page, 20, search)
      .then((res) => {
        setNotes((prev) => {
          const existingIds = new Set(prev.map((n) => n._id));
          const uniqueNotes = res.notes.filter(
            (n: Note) => !existingIds.has(n._id),
          );
          return [...prev, ...uniqueNotes];
        });

        setTotalPages(res.totalPages);
      })
      .finally(() => {
        setIsFetchingNext(false);
        setLoading(false);
      });
  }, [page, refreshKey, search]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNext && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isFetchingNext, page, totalPages]);

  if (loading && notes.length === 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full h-40 bg-gray-100 animate-pulse rounded-3xl"
          />
        ))}
      </div>
    );
  }

  if (notes.length === 0 && !loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center gap-4 text-gray-400">
        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full border border-gray-100">
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <span className="font-bold text-sm tracking-widest uppercase">
          No notes yet
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {notes.map((note) => (
          <Card key={note._id} note={note} onClick={() => onNoteClick(note)} />
        ))}
      </div>

      {/* Scroll trigger */}
      {page < totalPages && <div ref={loadMoreRef} className="h-6" />}
    </>
  );
}
