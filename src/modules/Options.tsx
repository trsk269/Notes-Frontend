import HashTagSuggestions from "../molecules/HashTagSuggestions";
import { FaAngleDown } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import CategoryDropdown from "../molecules/CategoryDropdown";

export default function Options() {
  return (
    <div className="w-full flex flex-col justify-between items-center h-30 border border-black p-2">
      <div className="w-full h-1/2 border border-black flex items-center justify-between p-2">
        <CategoryDropdown />
        <div className="">
          <IoGridOutline size={18} />
        </div>
      </div>
      <div className="w-full h-1/2 flex overflow-x-auto gap-2 py-2">
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
