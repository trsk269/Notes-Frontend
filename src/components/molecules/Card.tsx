import { MdOutlinePushPin, MdNotificationsActive } from "react-icons/md";
import { Note } from "../../types/note";

interface CardProps {
  note: Note;
  onClick: () => void;
}

export default function Card({ note, onClick }: CardProps) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      onClick={onClick}
      className={`group w-full flex flex-col ${note.theme || "bg-white"} border border-gray-100 rounded-[32px] p-6 gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 active:scale-[0.98] cursor-pointer relative overflow-hidden`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-[#1F2937] leading-tight line-clamp-2 pr-8">
            {note.title}
          </h3>
          <div className="flex flex-col gap-2 absolute top-6 right-6">
            {note.isPinned && (
              <div className="bg-[#6EE7B7] text-white p-1.5 rounded-lg shadow-sm">
                <MdOutlinePushPin size={16} />
              </div>
            )}
            {note.notifyAt && (
              <div className="bg-[#7DD3FC] text-white p-1.5 rounded-lg shadow-sm">
                <MdNotificationsActive size={16} />
              </div>
            )}
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
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-medium">
          {note.notes}
        </p>
      </div>

      {note.isArchived && (
        <div className="absolute bottom-6 right-6">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[8px] font-bold rounded-md uppercase tracking-tighter">
            Archived
          </span>
        </div>
      )}
    </div>
  );
}
