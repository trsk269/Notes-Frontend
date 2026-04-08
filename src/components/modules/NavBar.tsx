import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "../../store/auth.store";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleSearchClick = () => {
    router.push("/search");
  };

  const displayName = user?.name || user?.username || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="w-full flex items-center justify-between py-4 group">
      {/* Profile Section */}
      <div
        onClick={handleProfileClick}
        className="flex gap-4 items-center cursor-pointer group/avatar"
      >
        <div className="relative">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt={displayName}
              className="w-12 h-12 rounded-2xl object-cover shadow-lg shadow-sky-100 group-hover/avatar:scale-105 transition-transform duration-300 border-2 border-white"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-tr from-[#7DD3FC] to-[#6EE7B7] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-100 group-hover/avatar:scale-105 transition-transform duration-300">
              {initial}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Welcome back
          </span>
          <h4 className="text-[#1F2937] font-extrabold text-lg leading-tight">
            {user?.name || user?.username || "Friend"}
          </h4>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSearchClick}
          className="p-3 bg-white text-gray-400 hover:text-[#7DD3FC] hover:bg-sky-50 rounded-2xl transition-all duration-300 shadow-sm border border-gray-100/50"
        >
          <IoSearchOutline size={22} />
        </button>
        <button className="p-3 bg-white text-gray-400 hover:text-[#6EE7B7] hover:bg-emerald-50 rounded-2xl transition-all duration-300 shadow-sm border border-gray-100/50 relative group/notif">
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full group-hover/notif:scale-125 transition-transform"></span>
          <IoIosNotificationsOutline size={22} />
        </button>
      </div>
    </nav>
  );
}
