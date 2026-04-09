import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { useAuthStore } from "../../store/auth.store";
import { useRouter } from "next/navigation";

interface NavBarProps {
  onAddClick: () => void;
}

export default function NavBar({ onAddClick }: NavBarProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const displayName = user?.name || user?.username || "Friend";
  const initial = displayName.charAt(0).toUpperCase();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <nav className="w-full flex flex-col px-5 pt-5 pb-3 bg-[#FAFAF8] flex-shrink-0">
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center gap-3 cursor-pointer active:opacity-70 transition-opacity"
          onClick={() => router.push("/profile")}
        >
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt={displayName}
              className="w-10 h-10 rounded-[14px] object-cover border border-[#EDECE6]"
            />
          ) : (
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-[14px] flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0">
              {initial}
            </div>
          )}
          <div>
            <p className="text-[10px] font-semibold text-[#B0ADA4] uppercase tracking-widest leading-none mb-0.5">
              {greeting}
            </p>
            <p className="text-[15px] font-bold text-[#1A1A1A] tracking-tight leading-none">
              {displayName}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push("/search")}
            className="w-[38px] h-[38px] bg-white border border-[#EDECE6] rounded-xl flex items-center justify-center text-[#888] active:scale-95 transition-transform"
          >
            <IoSearchOutline size={18} />
          </button>
          <button
            onClick={() => router.push("/notifications")}
            className="w-[38px] h-[38px] bg-white border border-[#EDECE6] rounded-xl flex items-center justify-center text-[#888] relative active:scale-95 transition-transform"
          >
            <IoIosNotificationsOutline size={18} />
            <span className="absolute top-2 right-2 w-[7px] h-[7px] bg-red-500 rounded-full border-[1.5px] border-[#FAFAF8]" />
          </button>
        </div>
      </div>

      {/* Section header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-extrabold text-[#1A1A1A] tracking-tight">
          My Notes
        </h1>
        <button
          onClick={onAddClick}
          className="w-[42px] h-[42px] bg-[#1A1A1A] rounded-[14px] flex items-center justify-center active:scale-95 transition-transform"
        >
          <MdAdd size={22} color="#fff" />
        </button>
      </div>
    </nav>
  );
}
