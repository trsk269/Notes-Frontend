"use client";
import { useEffect, useRef, useState } from "react";
import Card from "../molecules/Card";
import { getNotes } from "../../services/notes.service";
import { Note } from "../../types/note";
import Link from "next/link";

export default function Result() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchedPagesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (fetchedPagesRef.current.has(page)) return;

    fetchedPagesRef.current.add(page);
    setIsFetchingNext(true);

    getNotes(page)
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
  }, [page]);

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

  if (loading) return null;

  if (notes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Link
          href="/note/add"
          className="border border-gray-400 text-gray-400 px-4 py-2 rounded-md"
        >
          + Add your first note
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid grid-cols-2 gap-1 p-2">
        {notes.map((note) => (
          <Card key={note._id} note={note} />
        ))}
      </div>

      {/* Scroll trigger */}
      {page < totalPages && <div ref={loadMoreRef} className="h-6" />}
    </>
  );
}
