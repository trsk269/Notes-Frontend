import HashTagSuggestions from "../molecules/HashTagSuggestions";

export default function Options() {
  return (
    <div className="w-full flex flex-col justify-between items-center p-2 text-gray-400">
      <div className="w-full flex overflow-x-auto gap-2 py-2">
        <HashTagSuggestions />
        <HashTagSuggestions />
        <HashTagSuggestions />
        <HashTagSuggestions />
        <HashTagSuggestions />
        <HashTagSuggestions />
      </div>
    </div>
  );
}
