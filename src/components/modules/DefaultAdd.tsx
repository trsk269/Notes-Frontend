import { MdAdd } from "react-icons/md";

interface DefaultAddProps {
  onAddClick: () => void;
}

const DefaultAdd = ({ onAddClick }: DefaultAddProps) => {
  return (
    <div className="w-full flex justify-between items-end py-4 group">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter">
          My Notes
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1.5 bg-[#6EE7B7] rounded-full animate-in slide-in-from-left duration-1000"></div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            Organized thoughts
          </span>
        </div>
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center justify-center w-14 h-14 bg-white hover:bg-[#6EE7B7] text-[#1F2937] hover:text-white rounded-[20px] transition-all duration-300 shadow-xl shadow-emerald-100/50 hover:shadow-[#6EE7B7]/30 border border-emerald-50 active:scale-95 group/btn"
      >
        <MdAdd
          size={30}
          className="group-hover/btn:rotate-90 transition-transform duration-500"
        />
      </button>
    </div>
  );
};

export default DefaultAdd;
