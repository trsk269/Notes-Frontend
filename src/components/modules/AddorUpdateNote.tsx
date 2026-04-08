"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { Note } from "../../types/note";
import {
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../../services/notes.service";
import { useRouter } from "next/navigation";

interface AddorUpdateNoteProps {
  isOpen?: boolean;
  onClose?: () => void;
  note?: Note | null;
  onSave?: () => void;
  mode?: "add" | "update";
  noteId?: string;
  isPage?: boolean;
}

type ActiveTab = "add" | "color" | "menu" | "reminder" | null;

const AddorUpdateNote = ({
  isOpen = true,
  onClose,
  note: initialNote,
  onSave,
  mode,
  noteId,
  isPage = true,
}: AddorUpdateNoteProps) => {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(initialNote || null);
  const [form, setForm] = useState({
    title: "",
    notes: "",
    theme: "",
    isPinned: false,
    isArchived: false,
    notifyAt: null as string | null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [toast, setToast] = useState<string | null>(null);

  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noteId && !initialNote) {
      const fetchNote = async () => {
        try {
          setLoading(true);
          const response = await getNoteById(noteId);
          setNote(response.note);
        } catch (err) {
          setError("Failed to fetch note");
        } finally {
          setLoading(false);
        }
      };
      fetchNote();
    }
  }, [noteId, initialNote]);

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title,
        notes: note.notes,
        theme: note.theme || "bg-white",
        isPinned: note.isPinned,
        isArchived: note.isArchived,
        notifyAt: note.notifyAt || null,
      });
    } else {
      setForm({
        title: "",
        notes: "",
        theme: "bg-white",
        isPinned: false,
        isArchived: false,
        notifyAt: null,
      });
    }
    setActiveTab(null);
    setError(null);
  }, [note, isOpen]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!form.title && !form.notes) {
      setError("Please add a title or content");
      return;
    }

    setError(null);
    try {
      setLoading(true);
      if (note) {
        await updateNote(note._id, form);
      } else {
        await createNote(form);
      }

      if (onSave) {
        onSave();
      } else {
        router.push("/");
      }

      if (onClose) {
        onClose();
      } else {
        router.back();
      }
    } catch (err) {
      setError("Something went wrong while saving");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      setLoading(true);
      await deleteNote(note._id);
      if (onSave) {
        onSave();
      } else {
        router.push("/");
      }

      if (onClose) {
        onClose();
      } else {
        router.back();
      }
    } catch (err) {
      setError("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (tab: ActiveTab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const showToast = (message: string) => {
    setToast(message);
  };

  const togglePin = () => {
    const newVal = !form.isPinned;
    setForm({ ...form, isPinned: newVal });
    showToast(newVal ? "Note Pinned" : "Note Unpinned");
  };

  const toggleArchive = () => {
    const newVal = !form.isArchived;
    setForm({ ...form, isArchived: newVal });
    showToast(newVal ? "Note Archived" : "Note Unarchived");
  };

  const addMenuItems = [
    { icon: CiCamera, label: "Take Photo" },
    { icon: RiImageAddFill, label: "Add Image" },
    { icon: HiOutlinePaintBrush, label: "Drawing" },
    { icon: BsRecord2, label: "Recording" },
    { icon: FaRegCheckSquare, label: "Checkboxes" },
  ];

  const moreMenuItems = [
    { icon: RiDeleteBin6Line, label: "Delete", onClick: handleDelete },
    { icon: MdOutlineContentCopy, label: "Make a Copy" },
    { icon: IoShareSocialOutline, label: "Send" },
    { icon: IoPersonAddOutline, label: "Collaborator" },
    { icon: MdOutlineLabel, label: "Labels" },
    { icon: IoIosHelpCircleOutline, label: "Help and Contact" },
  ];

  const colors = [
    { name: "Sky", class: "bg-[#7DD3FC]" },
    { name: "Emerald", class: "bg-[#6EE7B7]" },
    { name: "Red", class: "bg-red-200" },
    { name: "Pink", class: "bg-pink-200" },
    { name: "Yellow", class: "bg-yellow-200" },
    { name: "Orange", class: "bg-orange-200" },
    { name: "White", class: "bg-white" },
  ];

  const isDarkBackground = (theme: string) => {
    const darkThemes = ["bg-gray-600", "bg-[#1F2937]"];
    return darkThemes.includes(theme);
  };

  const getTextColor = (theme: string) => {
    return isDarkBackground(theme) ? "text-white" : "text-[#1F2937]";
  };

  const getPlaceholderColor = (theme: string) => {
    return isDarkBackground(theme)
      ? "placeholder:text-white/50"
      : "placeholder:text-[#1F2937]/50";
  };

  return (
    <div
      className={`${isPage ? "fixed inset-0" : "fixed inset-0 flex items-end justify-center bg-black/40 backdrop-blur-sm"} z-50 transition-opacity duration-300`}
      ref={backdropRef}
      onClick={(e) => {
        if (!isPage && e.target === backdropRef.current) {
          if (onClose) {
            onClose();
          } else {
            router.back();
          }
        }
      }}
    >
      <div
        className={`w-full ${isPage ? "h-screen" : "max-w-md h-[90vh] rounded-t-[40px] shadow-2xl"} ${form.theme} flex flex-col font-sans transition-all duration-500 relative animate-in ${isPage ? "fade-in" : "slide-in-from-bottom"} duration-500`}
      >
        {/* Toast Notification */}
        {toast && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1F2937] text-white px-6 py-2 rounded-2xl text-xs font-bold shadow-xl animate-in fade-in slide-in-from-top-2">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="w-full flex items-center justify-between p-6 pt-12 md:pt-6">
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                router.back();
              }
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl ${isDarkBackground(form.theme) ? "bg-white/10 text-white border-white/10" : "bg-gray-50/50 text-[#1F2937] border-gray-100/20"} hover:scale-105 transition-all border`}
          >
            <IoMdArrowBack size={24} />
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => toggleTab("reminder")}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all border ${form.notifyAt ? "bg-[#7DD3FC] text-white border-[#7DD3FC]" : isDarkBackground(form.theme) ? "bg-white/10 text-white/60 border-white/10" : "bg-gray-50/50 text-gray-400 border-gray-100/20"}`}
            >
              <LuBellPlus size={22} />
            </button>
            <button
              onClick={togglePin}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all border ${form.isPinned ? "bg-[#6EE7B7] text-white border-[#6EE7B7]" : isDarkBackground(form.theme) ? "bg-white/10 text-white/60 border-white/10" : "bg-gray-50/50 text-gray-400 border-gray-100/20"}`}
            >
              <MdOutlinePushPin size={22} />
            </button>
            <button
              onClick={toggleArchive}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all border ${form.isArchived ? "bg-yellow-400 text-white border-yellow-400" : isDarkBackground(form.theme) ? "bg-white/10 text-white/60 border-white/10" : "bg-gray-50/50 text-gray-400 border-gray-100/20"}`}
            >
              <RiInboxArchiveLine size={22} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-600 text-xs font-bold rounded-2xl border border-red-100 mb-4 animate-in shake duration-500">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="flex-grow flex flex-col px-8 gap-4 overflow-y-auto pb-32">
          <textarea
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full bg-transparent outline-none ${getTextColor(form.theme)} text-4xl font-black tracking-tight ${getPlaceholderColor(form.theme)} resize-none transition-colors duration-300 drop-shadow-sm`}
            rows={1}
          />

          <textarea
            placeholder="Start typing your note here..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={`w-full bg-transparent outline-none ${getTextColor(form.theme)} text-xl font-semibold leading-relaxed ${getPlaceholderColor(form.theme)} resize-none min-h-[400px] transition-colors duration-300`}
          />
        </div>

        {/* Premium Dock Toolbar */}
        <div
          className={`p-6 fixed bottom-0 left-0 right-0 z-50 ${isPage ? "max-w-2xl mx-auto" : ""}`}
        >
          <div className="w-full bg-[#1F2937]/90 backdrop-blur-md rounded-[32px] p-2 flex flex-col shadow-2xl transition-all duration-300 border border-white/10">
            {/* Expansion Area */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab ? "max-h-[400px] opacity-100 p-4" : "max-h-0 opacity-0"}`}
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
                      <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest text-center">
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
                        onClick={() => setForm({ ...form, theme: color.class })}
                        className={`w-10 h-10 rounded-full border-2 ${form.theme === color.class ? "border-white" : "border-white/20"} flex-shrink-0 ${color.class} hover:scale-110 transition-transform`}
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
                      onClick={item.onClick}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 text-white transition-all text-left"
                    >
                      <item.icon size={18} className="text-white/60" />
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "reminder" && (
                <div className="flex flex-col gap-4">
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-widest px-2">
                    Set Reminder
                  </span>
                  <div className="px-2">
                    <input
                      type="datetime-local"
                      value={
                        form.notifyAt
                          ? new Date(form.notifyAt).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          notifyAt: e.target.value
                            ? new Date(e.target.value).toISOString()
                            : null,
                        })
                      }
                      className="w-full bg-white/10 text-white border border-white/20 rounded-xl p-3 outline-none focus:border-white/40 transition-all font-bold"
                    />
                  </div>
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
                  className="px-6 py-3 bg-[#6EE7B7] text-[#1F2937] font-black rounded-2xl hover:bg-white transition-all shadow-lg active:scale-95 flex items-center justify-center disabled:opacity-50 min-w-[120px]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  ) : note ? (
                    "Update"
                  ) : (
                    "Save Note"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddorUpdateNote;
