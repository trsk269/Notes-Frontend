import { MdOutlinePushPin, MdNotificationsActive } from "react-icons/md";
import { Note } from "../../types/note";

const TAG_CONFIG: Record<
  string,
  {
    cardBg: string;
    cardBorder: string;
    dot: string;
    pillBg: string;
    pillText: string;
  }
> = {
  work: {
    cardBg: "#FFFBEB",
    cardBorder: "#FDE68A",
    dot: "#F59E0B",
    pillBg: "#EEF2FF",
    pillText: "#6366F1",
  },
  personal: {
    cardBg: "#F0FDF4",
    cardBorder: "#BBF7D0",
    dot: "#10B981",
    pillBg: "#F0FDF4",
    pillText: "#16A34A",
  },
  idea: {
    cardBg: "#F8F8F5",
    cardBorder: "#E8E5DC",
    dot: "#6366F1",
    pillBg: "#FFF7ED",
    pillText: "#D97706",
  },
  default: {
    cardBg: "#ffffff",
    cardBorder: "#EDECE6",
    dot: "#C8C5BC",
    pillBg: "#F5F5F0",
    pillText: "#888",
  },
};

function formatDate(raw: string) {
  const d = new Date(raw);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();

  if (isToday)
    return `Today, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  if (isYesterday) return "Yesterday";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

interface CardProps {
  note: Note;
  onClick: () => void;
}

export default function Card({ note, onClick }: CardProps) {
  const tagKey = (note.tags?.[0]?.name ?? "").toLowerCase();
  const cfg = TAG_CONFIG[tagKey] ?? TAG_CONFIG.default;
  const hasActions = note.isPinned || note.notifyAt;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[18px] p-[14px] flex flex-col gap-[9px] border transition-transform active:scale-[0.98]"
      style={{
        background: note.isArchived ? "#F8F8F5" : cfg.cardBg,
        borderColor: note.isArchived ? "#E8E5DC" : cfg.cardBorder,
        opacity: note.isArchived ? 0.72 : 1,
      }}
    >
      {/* ── Top row ── */}
      <div className="flex items-start justify-between gap-2">
        <p
          className="text-[13px] font-bold text-[#1A1A1A] tracking-tight leading-snug line-clamp-2 flex-1"
          style={{ color: note.isArchived ? "#888" : "#1A1A1A" }}
        >
          {note.title || "Untitled"}
        </p>

        {/* Action icons or dot */}
        {hasActions ? (
          <div className="flex gap-[5px] flex-shrink-0">
            {note.isPinned && (
              <div className="w-[20px] h-[20px] bg-[#1A1A1A] rounded-[7px] flex items-center justify-center">
                <MdOutlinePushPin size={11} color="#fff" />
              </div>
            )}
            {note.notifyAt && (
              <div className="w-[20px] h-[20px] bg-[#1A1A1A] rounded-[7px] flex items-center justify-center">
                <MdNotificationsActive size={11} color="#fff" />
              </div>
            )}
          </div>
        ) : (
          <div
            className="w-[7px] h-[7px] rounded-full flex-shrink-0 mt-[3px]"
            style={{ background: cfg.dot }}
          />
        )}
      </div>

      {/* ── Body ── */}
      {note.notes && (
        <p className="text-[11px] text-[#B0ADA4] leading-relaxed line-clamp-2 font-normal">
          {note.notes}
        </p>
      )}

      {/* ── Footer ── */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-[#C8C5BC] tracking-wide">
          {formatDate(note.createdAt)}
        </span>

        <div className="flex items-center gap-[5px]">
          {note.isArchived && (
            <span className="px-[6px] py-[2px] bg-[#F0EFEC] text-[#B0ADA4] text-[9px] font-bold rounded-[5px] uppercase tracking-wider">
              Archived
            </span>
          )}
          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-end">
              {note.tags.map((tag) => {
                const tagCfg =
                  TAG_CONFIG[tag.name.toLowerCase()] ?? TAG_CONFIG.default;
                return (
                  <span
                    key={tag._id}
                    className="px-[7px] py-[3px] rounded-full text-[9px] font-bold"
                    style={{
                      background: tagCfg.pillBg,
                      color: tagCfg.pillText,
                    }}
                  >
                    {tag.name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
