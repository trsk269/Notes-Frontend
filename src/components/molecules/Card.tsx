import { MdOutlineModeEdit } from "react-icons/md";
import Link from "next/link";
import { Note } from "../../types/note";

interface CardProps {
  note: Note;
}

export default function Card({ note }: CardProps) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group w-full flex flex-col bg-white border border-gray-100 rounded-3xl p-6 gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 active:scale-[0.98]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-[#1F2937] leading-tight line-clamp-2">
            {note.title}
          </h3>
          <div className="flex-shrink-0 ml-4 group-hover:scale-110 transition-transform">
            <Link
              href={`/note/edit/${note._id}`}
              className="flex items-center justify-center w-10 h-10 bg-gray-50 text-gray-400 hover:text-[#7DD3FC] hover:bg-sky-50 rounded-xl transition-all"
            >
              <MdOutlineModeEdit size={20} />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6EE7B7]"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="relative">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 font-medium">
          {note.notes}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-full border border-gray-100 uppercase tracking-tighter">
          #Personal
        </span>
      </div>
    </div>
  );
}
