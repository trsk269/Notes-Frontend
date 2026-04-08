import React, { useEffect, useState } from "react";
import HashTagSuggestions from "../molecules/HashTagSuggestions";
import { getTags } from "../../services/tags.service";

interface OptionsProps {
  onSelectTag: (tagId: string) => void;
  selectedTagId: string;
}

export default function Options({ onSelectTag, selectedTagId }: OptionsProps) {
  const [tags, setTags] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    getTags().then((res) => {
      if (res.tags) {
        setTags(res.tags);
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col justify-between items-center p-2 text-gray-400">
      <div className="w-full flex overflow-x-auto gap-2 py-2 no-scrollbar">
        <HashTagSuggestions
          name="All"
          active={selectedTagId === ""}
          onClick={() => onSelectTag("")}
        />
        {tags.map((tag) => (
          <HashTagSuggestions
            key={tag._id}
            name={tag.name}
            active={selectedTagId === tag._id}
            onClick={() => onSelectTag(tag._id)}
          />
        ))}
      </div>
    </div>
  );
}
