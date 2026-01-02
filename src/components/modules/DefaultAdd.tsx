import { MdAdd } from "react-icons/md";
import Link from "next/link";

const DefaultAdd = () => {
  return (
    <div className="w-full flex justify-between items-center p-2 text-gray-400">
      <p className="text-3xl font-thin">Your Notes</p>
      <div className="border border-gray-400 justify-center items-center rounded-md p-1">
        <Link href={"/note/add"}>
          <MdAdd size={16} />
        </Link>
      </div>
    </div>
  );
};

export default DefaultAdd;
