import { MdAdd } from "react-icons/md";

const DefaultAdd = () => {
  return (
    <div className="w-full flex justify-between items-center h-30 border border-black px-2">
      <p className="text-6xl font-thin">Your Notes</p>
      <div className="border border-black justify-center items-center rounded-lg p-2">
        <MdAdd size={32} />
      </div>
    </div>
  );
};

export default DefaultAdd;
