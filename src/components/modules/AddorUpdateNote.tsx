"use client";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LuBellPlus } from "react-icons/lu";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscSymbolColor } from "react-icons/vsc";
import { PiTextAUnderlineBold } from "react-icons/pi";
import { MdAdd } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { RiImageAddFill } from "react-icons/ri";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { BsRecord2 } from "react-icons/bs";
import { FaRegCheckSquare } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineLabel } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlinePushPin } from "react-icons/md";

interface AddorUpdateNoteProps {
  mode: "add" | "update";
  noteId?: string;
}

type ActiveTab = "add" | "color" | "menu" | null;

const AddorUpdateNote = ({ mode, noteId }: AddorUpdateNoteProps) => {
  const [form, setForm] = useState({
    title: "",
    notes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  // Mock router for demo
  const router = {
    back: () => console.log("Navigate back"),
    push: (path: string) => console.log("Navigate to:", path),
  };

  const handleSave = async () => {
    setError(null);
    try {
      setLoading(true);
      console.log("Saving note:", form);
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  const toggleTab = (tab: ActiveTab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const addMenuItems = [
    { icon: CiCamera, label: "Take Photo" },
    { icon: RiImageAddFill, label: "Add Image" },
    { icon: HiOutlinePaintBrush, label: "Drawing" },
    { icon: BsRecord2, label: "Recording" },
    { icon: FaRegCheckSquare, label: "Checkboxes" },
  ];

  const moreMenuItems = [
    { icon: RiDeleteBin6Line, label: "Delete" },
    { icon: MdOutlineContentCopy, label: "Make a Copy" },
    { icon: IoShareSocialOutline, label: "Send" },
    { icon: IoPersonAddOutline, label: "Collaborator" },
    { icon: MdOutlineLabel, label: "Labels" },
    { icon: IoIosHelpCircleOutline, label: "Help and Contact" },
  ];

  const colors = [
    "bg-[#7DD3FC]",
    "bg-[#6EE7B7]",
    "bg-red-200",
    "bg-pink-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-white",
  ];

  return (
    <div className="h-full min-h-screen bg-white flex flex-col font-sans transition-colors duration-500">
      {/* Header */}
      <div className="w-full flex items-center justify-between p-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-[#1F2937] hover:bg-gray-100 transition-all border border-gray-100"
        >
          <IoMdArrowBack size={20} />
        </button>

        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:text-[#7DD3FC] transition-all border border-gray-100">
            <LuBellPlus size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:text-[#6EE7B7] transition-all border border-gray-100">
            <MdOutlinePushPin size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:text-gray-600 transition-all border border-gray-100">
            <RiInboxArchiveLine size={20} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-6 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl animate-shake">
          {error}
        </div>
      )}

      {/* Inputs */}
      <div className="flex-grow flex flex-col p-6 gap-6 overflow-y-auto">
        <textarea
          placeholder="Note Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-transparent outline-none text-[#1F2937] text-4xl font-black tracking-tight placeholder:text-gray-200 resize-none"
          rows={1}
        />

        <textarea
          placeholder="Start typing your note here..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full bg-transparent outline-none text-[#1F2937] text-xl font-medium leading-relaxed placeholder:text-gray-200 resize-none"
        />
      </div>

      {/* Premium Dock Toolbar */}
      <div className="p-6 sticky bottom-0 bg-white">
        <div className="w-full bg-[#1F2937] rounded-[32px] p-2 flex flex-col shadow-2xl shadow-gray-200 transition-all duration-300">
          {/* Expansion Area */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab ? "max-h-[300px] opacity-100 p-4" : "max-h-0 opacity-0"}`}
          >
            {activeTab === "add" && (
              <div className="grid grid-cols-3 gap-4">
                {addMenuItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-white/20 transition-all">
                      <item.icon size={20} />
                    </div>
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === "color" && (
              <div className="flex flex-col gap-4">
                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest px-2">
                  Palette
                </span>
                <div className="flex gap-3 overflow-x-auto pb-2 px-2 scrollbar-hide">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      className={`w-10 h-10 rounded-full border-2 border-white/20 flex-shrink-0 ${color} hover:scale-110 transition-transform`}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div className="grid grid-cols-2 gap-2">
                {moreMenuItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 text-white transition-all"
                  >
                    <item.icon size={18} className="text-white/60" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Action Bar */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleTab("add")}
                className={`p-3 rounded-2xl transition-all ${activeTab === "add" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                <MdAdd size={24} />
              </button>
              <button className="p-3 text-white/60 hover:text-white transition-all">
                <PiTextAUnderlineBold size={24} />
              </button>
              <button
                onClick={() => toggleTab("color")}
                className={`p-3 rounded-2xl transition-all ${activeTab === "color" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                <VscSymbolColor size={24} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTab("menu")}
                className={`p-3 rounded-2xl transition-all ${activeTab === "menu" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                <BsThreeDotsVertical size={20} />
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-3 bg-[#6EE7B7] text-[#1F2937] font-black rounded-2xl hover:bg-white transition-all shadow-lg active:scale-95 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : mode === "add" ? (
                  "Add Note"
                ) : (
                  "Update Note"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddorUpdateNote;
