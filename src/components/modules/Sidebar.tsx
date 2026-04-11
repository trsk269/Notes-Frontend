"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  IoHome,
  IoHomeOutline,
  IoSearch,
  IoSearchOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoPerson,
  IoPersonOutline,
  IoArchive,
  IoArchiveOutline,
} from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/auth.store";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogout, setShowLogout] = React.useState(false);
  const { user, logout } = useAuthStore();

  const navItems = [
    { id: "/", label: "Home", icon: IoHomeOutline, activeIcon: IoHome },
    {
      id: "/search",
      label: "Search",
      icon: IoSearchOutline,
      activeIcon: IoSearch,
    },
    {
      id: "/notifications",
      label: "Notifications",
      icon: IoNotificationsOutline,
      activeIcon: IoNotifications,
    },
    {
      id: "/profile",
      label: "Profile",
      icon: IoPersonOutline,
      activeIcon: IoPerson,
    },
    {
      id: "/archive",
      label: "Archive",
      icon: IoArchiveOutline,
      activeIcon: IoArchive,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="hidden lg:flex flex-col w-[260px] h-screen bg-[#1A1A1A] text-white/50 border-r border-white/5 flex-shrink-0 sticky top-0">
      {/* Logo & Brand */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden relative">
          <Image src={logo} alt="Noted" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-white text-[18px] font-bold tracking-tight">
            Noted
          </h1>
          <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest mt-0.5">
            Workspace
          </p>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const ActiveIcon = item.activeIcon;
          const Icon = item.icon;
          const active = isActive(item.id);

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <div
                className={`${active ? "text-white" : "text-white/40 group-hover:text-white/60"}`}
              >
                {active ? <ActiveIcon size={20} /> : <Icon size={20} />}
              </div>
              <span className="text-[14px] font-semibold tracking-tight">
                {item.label}
              </span>
              {active && (
                <div className="ml-auto w-1 h-5 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section (Action + User) */}
      <div className="flex flex-col p-4 border-t border-white/5 bg-[#1A1A1A]">
        {/* Logout Tray (Revealed via max-h expansion) */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            showLogout
              ? "max-h-[120px] opacity-100 mb-4"
              : "max-h-0 opacity-0 mb-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push("/profile")}
              className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[13px] font-bold py-3 px-4 rounded-xl border border-white/5 transition-all active:scale-95 flex items-center gap-3 group"
            >
              <IoPersonOutline
                size={16}
                className="opacity-40 group-hover:opacity-100"
              />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white text-[13px] font-bold py-3 px-4 rounded-xl border border-[#EF4444]/20 transition-all active:scale-95 flex items-center gap-3 group"
            >
              <div className="w-1 h-4 bg-current opacity-20 group-hover:opacity-40 rounded-full" />
              Logout Account
            </button>
          </div>
        </div>

        {/* Action Area (Lifts when tray expands) */}
        <div className="transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <button
            onClick={() => router.push("/note/add")}
            className="w-full bg-white text-[#1A1A1A] py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-[14px] shadow-sm active:scale-[0.98] transition-all hover:scale-[1.01]"
          >
            <MdAdd size={20} />
            New Note
          </button>
        </div>

        {/* User Info (Anchor Point) */}
        <div className="mt-4">
          <div
            onClick={() => setShowLogout(!showLogout)}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-2xl transition-all duration-300 ${
              showLogout ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-sm">
                  {(user?.name || user?.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold truncate leading-none">
                {user?.name || user?.username || "Account User"}
              </p>
              <p className="text-white/30 text-[11px] font-medium truncate mt-1">
                {user?.email || "Workspace Active"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
