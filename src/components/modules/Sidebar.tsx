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
  const { user } = useAuthStore();

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

  const isActive = (path: string) => pathname === path;

  return (
    <div className="hidden lg:flex flex-col w-[260px] h-screen bg-[#1A1A1A] text-white/50 border-r border-white/5 flex-shrink-0 sticky top-0">
      {/* Logo & Brand */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg">
          <Image src={logo} alt="Noted" width={32} height={32} />
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

      {/* Action Area */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => router.push("/note/add")}
          className="w-full bg-white text-[#1A1A1A] py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-[14px] shadow-sm active:scale-[0.98] transition-all"
        >
          <MdAdd size={20} />
          New Note
        </button>
      </div>

      {/* User Info */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-sm border border-white/10">
          {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-[13px] font-semibold truncate leading-none">
            {user?.name || user?.username}
          </p>
          <p className="text-white/30 text-[11px] font-medium truncate mt-1">
            {user?.email || "Account settings"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
