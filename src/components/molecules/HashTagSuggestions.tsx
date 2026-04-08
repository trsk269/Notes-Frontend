interface HashTagSuggestionsProps {
  name: string;
  active?: boolean;
  onClick?: () => void;
}

const HashTagSuggestions = ({
  name,
  active,
  onClick,
}: HashTagSuggestionsProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex text-center items-center justify-center w-fit h-fit border px-4 py-2 rounded-2xl shadow-sm transition-all duration-300 active:scale-95 group flex-shrink-0 ${
        active
          ? "bg-sky-50 border-sky-100 shadow-md scale-105"
          : "bg-white border-gray-100 hover:bg-sky-50/50 hover:shadow-md"
      }`}
    >
      <span
        className={`text-sm font-bold transition-colors duration-300 ${
          active
            ? "text-[#7DD3FC]"
            : "text-gray-500 group-hover:text-[#7DD3FC]/70"
        }`}
      >
        {name.startsWith("#") ? name : `#${name}`}
      </span>
    </button>
  );
};

export default HashTagSuggestions;
