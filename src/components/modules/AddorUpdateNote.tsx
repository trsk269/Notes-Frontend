"use client";
import React, { useEffect, useState } from "react";
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
      // Mock save logic
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

  // Menu items data
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
    "bg-green-200",
    "bg-red-200",
    "bg-blue-200",
    "bg-pink-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-white",
    "bg-orange-200",
    "bg-white",
  ];

  return (
    <div className="h-full min-h-screen bg-black p-4">
      <div className="flex items-center justify-between">
        <div
          onClick={() => router.back()}
          className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer"
        >
          <IoMdArrowBack className="text-white" />
        </div>

        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <LuBellPlus className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <MdOutlinePushPin className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <RiInboxArchiveLine className="text-white" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="w-full flex flex-col overflow-y-scroll mt-12">
        <textarea
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 outline-none text-white text-3xl bg-transparent"
        />

        <textarea
          placeholder="Note"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="p-2 outline-none text-white text-xl bg-transparent"
        />
      </div>

      <div className="flex flex-col items-center justify-between fixed bottom-4 left-4 right-4">
        {/* Bottom Action Bar */}
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2">
            <div
              onClick={() => toggleTab("add")}
              className={`w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                activeTab === "add" ? "bg-white" : ""
              }`}
            >
              <MdAdd
                className={`transition-colors ${activeTab === "add" ? "text-black" : "text-white"}`}
              />
            </div>

            <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
              <PiTextAUnderlineBold className="text-white" />
            </div>

            <div
              onClick={() => toggleTab("color")}
              className={`w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                activeTab === "color" ? "bg-white" : ""
              }`}
            >
              <VscSymbolColor
                className={`transition-colors ${activeTab === "color" ? "text-black" : "text-white"}`}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div
              onClick={() => toggleTab("menu")}
              className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer"
            >
              <BsThreeDotsVertical className="text-white" />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="text-white"
            >
              {mode === "add" ? "Add Note" : "Update Note"}
            </button>
          </div>
        </div>

        {/* Sliding Tabs Container */}
        <div className="w-full overflow-hidden">
          {/* Add Menu Tab */}
          <div
            className={`w-full flex flex-col transition-all duration-300 ease-in-out ${
              activeTab === "add"
                ? "max-h-[400px] opacity-100 mt-4"
                : "max-h-0 opacity-0"
            }`}
          >
            {addMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full text-white text-xl p-2 flex gap-8 items-center justify-start"
                >
                  <div className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer">
                    <Icon className="text-white" />
                  </div>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* More Menu Tab */}
          <div
            className={`w-full flex flex-col transition-all duration-300 ease-in-out ${
              activeTab === "menu"
                ? "max-h-[500px] opacity-100 mt-4"
                : "max-h-0 opacity-0"
            }`}
          >
            {moreMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full text-white text-xl p-2 flex gap-8 items-center justify-start"
                >
                  <div className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer">
                    <Icon className="text-white" />
                  </div>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Color Menu Tab */}
          <div
            className={`w-full flex flex-col text-white gap-4 transition-all duration-300 ease-in-out ${
              activeTab === "color"
                ? "max-h-[500px] opacity-100 mt-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-lg">Color</h1>
              <div className="w-full flex overflow-x-auto gap-2 py-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-fit h-fit p-6 border-gray-300 rounded-full ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg">Background</h1>
              <div className="w-full flex overflow-x-auto gap-2 py-2">
                {[...Array(8)].map((_, index) => (
                  <button
                    key={index}
                    className="w-fit h-fit p-6 border-2 border-gray-300 rounded-full relative overflow-hidden hover:border-gray-400 transition-all bg-gradient-to-br from-purple-400 to-pink-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddorUpdateNote;
