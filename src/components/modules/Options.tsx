import React, { useEffect, useState } from "react";
import { getTags } from "../../services/tags.service";

interface OptionsProps {
  onSelectTag: (tagId: string) => void;
  selectedTagId: string;
}

export default function Options({ onSelectTag, selectedTagId }: OptionsProps) {
  const [tags, setTags] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    getTags().then((res) => {
      if (res.tags) setTags(res.tags);
    });
  }, []);

  const all = [{ _id: "", name: "All" }, ...tags];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
      {all.map((tag) => {
        const active = selectedTagId === tag._id;
        return (
          <button
            key={tag._id}
            onClick={() => onSelectTag(tag._id)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap tracking-tight transition-all active:scale-95 ${
              active
                ? "bg-[#1A1A1A] text-white"
                : "bg-white text-[#B0ADA4] border border-[#EDECE6]"
            }`}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}
