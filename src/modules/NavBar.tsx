import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function NavBar() {
  return (
    <>
      <div className="w-full h-20  border border-black flex items-center justify-between px-2">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <h4>
            <span className="text-gray-400">Welcome back</span> Chad
          </h4>
        </div>
        <div className="flex gap-2">
          <IoSearchOutline size={32} />
          <div className="relative">
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            <IoIosNotificationsOutline size={32} />
          </div>
        </div>
      </div>
    </>
  );
}
