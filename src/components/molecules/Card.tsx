import { MdOutlineModeEdit } from "react-icons/md";
import Link from "next/link";
import { Note } from "../../types/note";

interface CardProps {
  note: Note;
}

export default function Card({ note }: CardProps) {
  return (
    <div className="w-full h-auto flex flex-col border border-gray-400 rounded-lg p-2 gap-4 text-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{note.title}</h1>
        <p className="text-sm">{new Date(note.createdAt).toDateString()}</p>
      </div>

      <div>
        <p className="text-sm line-clamp-3">{note.notes}</p>
      </div>

      <div className="w-fit h-fit">
        <Link href={`/note/edit/${note._id}`}>
          <MdOutlineModeEdit size={16} />
        </Link>
      </div>
    </div>
  );
}
