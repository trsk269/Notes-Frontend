"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
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
import { getTags, createTag } from "../../services/tags.service";
import { IoCloseOutline } from "react-icons/io5";

interface AddorUpdateNoteProps {
  isOpen?: boolean;
  onClose?: () => void;
  note?: Note | null;
  onSave?: () => void;
  mode?: "add" | "update";
  noteId?: string;
  isPage?: boolean;
}

type ActiveTab = "add" | "color" | "menu" | "reminder" | "tags" | null;

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
    tags: [] as { _id: string; name: string }[],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<{ _id: string; name: string }[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const res = await getTags();
        if (res.tags) setAllTags(res.tags);
      } catch (err) {
        console.error("Failed to fetch tags");
      }
    };
    fetchAllTags();

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
        tags: note.tags || [],
      });
    } else {
      setForm({
        title: "",
        notes: "",
        theme: "bg-white",
        isPinned: false,
        isArchived: false,
        notifyAt: null,
        tags: [],
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
      const payload = {
        ...form,
        tags: form.tags.map((t) => t._id),
      };

      if (note) {
        await updateNote(note._id, payload);
      } else {
        await createNote(payload);
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
    { icon: MdOutlineLabel, label: "Labels", onClick: () => toggleTab("tags") },
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
    return isDarkBackground(theme) ? "text-white" : "text-[#1A1A1A]";
  };

  const getPlaceholderColor = (theme: string) => {
    return isDarkBackground(theme)
      ? "placeholder:text-white/40"
      : "placeholder:text-[#1A1A1A]/25";
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`${isPage ? "h-screen bg-[#FAFAF8]" : "fixed inset-0 flex items-end justify-center bg-black/40 backdrop-blur-sm"} z-50 transition-opacity duration-300`}
      ref={backdropRef}
      onClick={(e) => {
        if (!isPage && e.target === backdropRef.current) handleClose();
      }}
    >
      <div
        className={`w-full ${isPage ? "h-full" : "max-w-md h-[90vh] rounded-t-[36px] shadow-2xl"} ${form.theme || "bg-[#FAFAF8]"} flex flex-col font-sans transition-all duration-500 relative animate-in ${isPage ? "fade-in" : "slide-in-from-bottom"} duration-500`}
      >
        {/* ── Toast ── */}
        {toast && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-5 py-2 rounded-full text-[12px] font-semibold shadow-xl animate-in fade-in slide-in-from-top-2 whitespace-nowrap">
            {toast}
          </div>
        )}

        {/* ── Header ── */}
        <div
          className={`w-full flex items-center justify-between ${isDesktop ? "px-12 py-8" : "px-5 py-4"} flex-shrink-0`}
        >
          {/* Back */}
          <button
            onClick={handleClose}
            className={`w-[42px] h-[42px] flex items-center justify-center rounded-[16px] border transition-all active:scale-95 ${
              isDarkBackground(form.theme)
                ? "bg-white/10 border-white/10 text-white"
                : "bg-white/70 border-[#EDECE6] text-[#1A1A1A]"
            }`}
          >
            <IoChevronBack size={20} />
          </button>

          {/* Desktop Big Title */}
          {isDesktop && (
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-[0.2em] mb-1">
                {mode === "add" ? "Create New" : "Editor Mode"}
              </span>
              {/* <div className="flex items-center gap-1.5 bg-[#F5F5F0] px-3 py-1 rounded-full">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${form.theme || "bg-[#1A1A1A] animate-pulse"}`}
                />
                <span className="text-[11px] font-bold text-[#1A1A1A] tracking-tight">
                  {mode === "add" ? "Drafting" : "Synchronized"}
                </span>
              </div> */}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2.5">
            {/* Reminder */}
            <button
              onClick={() => toggleTab("reminder")}
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-[16px] border transition-all active:scale-95 ${
                form.notifyAt
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : isDarkBackground(form.theme)
                    ? "bg-white/10 border-white/10 text-white/60"
                    : "bg-white/70 border-[#EDECE6] text-[#888]"
              }`}
            >
              <LuBellPlus size={20} />
            </button>

            {/* Pin */}
            <button
              onClick={togglePin}
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-[16px] border transition-all active:scale-95 ${
                form.isPinned
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : isDarkBackground(form.theme)
                    ? "bg-white/10 border-white/10 text-white/60"
                    : "bg-white/70 border-[#EDECE6] text-[#888]"
              }`}
            >
              <MdOutlinePushPin size={20} />
            </button>

            {/* Archive */}
            <button
              onClick={toggleArchive}
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-[16px] border transition-all active:scale-95 ${
                form.isArchived
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : isDarkBackground(form.theme)
                    ? "bg-white/10 border-white/10 text-white/60"
                    : "bg-white/70 border-[#EDECE6] text-[#888]"
              }`}
            >
              <RiInboxArchiveLine size={20} />
            </button>

            {/* Desktop More Actions */}
            {isDesktop && (
              <button
                onClick={() => toggleTab("menu")}
                className={`w-[42px] h-[42px] flex items-center justify-center rounded-[16px] border transition-all active:scale-95 ${
                  activeTab === "menu"
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white border-[#EDECE6] text-[#888]"
                }`}
              >
                <BsThreeDotsVertical size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div
            className={`mx-5 mb-3 px-4 py-3 bg-red-50 border border-red-100 text-red-500 text-[12px] font-semibold rounded-[14px] flex-shrink-0 ${isDesktop ? "max-w-2xl mx-auto w-full" : ""}`}
          >
            {error}
          </div>
        )}

        {/* ── Text inputs ── */}
        <div
          className={`flex-1 flex flex-col ${isDesktop ? "max-w-4xl mx-auto w-full px-12 pt-10" : "px-6"} gap-6 overflow-y-auto pb-36`}
        >
          <textarea
            placeholder="Untitled Note"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full bg-transparent outline-none ${getTextColor(form.theme)} ${isDesktop ? "text-[56px]" : "text-[32px]"} font-black tracking-tightest leading-none ${getPlaceholderColor(form.theme)} resize-none`}
            rows={1}
            style={{ height: "auto" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />

          <textarea
            placeholder="What's on your mind?..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={`w-full bg-transparent outline-none ${getTextColor(form.theme)} ${isDesktop ? "text-[22px]" : "text-[16px]"} font-medium leading-relaxed ${getPlaceholderColor(form.theme)} resize-none min-h-[400px]`}
          />

          {/* Tag chips */}
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-4">
              {form.tags.map((tag) => (
                <div
                  key={tag._id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[12px] font-bold border ${
                    isDarkBackground(form.theme)
                      ? "bg-white/10 border-white/15 text-white"
                      : "bg-white border-[#EDECE6] text-[#1A1A1A] shadow-[0_4px_12px_rgb(0,0,0,0.03)]"
                  }`}
                >
                  #{tag.name}
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        tags: form.tags.filter((t) => t._id !== tag._id),
                      })
                    }
                    className="opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <IoCloseOutline size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Dock toolbar ── */}
        <div
          className={`p-6 fixed bottom-0 left-0 lg:left-[260px] right-0 z-50 ${isDesktop ? "flex justify-center" : ""}`}
        >
          <div
            className={`${isDesktop ? "max-w-xl w-full" : "w-full"} bg-[#1A1A1A] rounded-[32px] p-2 flex flex-col shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-300`}
          >
            {/* Expansion panel */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                activeTab
                  ? "max-h-[380px] opacity-100 px-4 pt-5 pb-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              {activeTab === "add" && (
                <div className="grid grid-cols-5 gap-3 pb-3">
                  {addMenuItems.map((item, idx) => (
                    <button
                      key={idx}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-[18px] flex items-center justify-center text-white/50 group-hover:bg-white/10 group-hover:text-white group-active:scale-95 transition-all border border-white/5">
                        <item.icon size={22} />
                      </div>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest text-center leading-tight">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "color" && (
                <div className="flex flex-col gap-4 pb-3">
                  <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] px-1">
                    Theme Selection
                  </span>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setForm({ ...form, theme: color.class })}
                        className={`w-11 h-11 rounded-full flex-shrink-0 border-[3px] transition-all active:scale-95 ${
                          form.theme === color.class
                            ? "border-white scale-110 shadow-lg"
                            : "border-transparent hover:border-white/20"
                        } ${color.class}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "menu" && (
                <div className="grid grid-cols-2 gap-2 pb-3">
                  {moreMenuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.onClick}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white transition-all active:scale-[0.97] text-left border border-white/5 hover:bg-white/5"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <item.icon
                        size={18}
                        className="text-white/30 flex-shrink-0"
                      />
                      <span className="text-[14px] font-bold tracking-tight">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "reminder" && (
                <div className="flex flex-col gap-4 pb-3">
                  <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] px-1">
                    Set Alert Notification
                  </span>
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
                    className="w-full text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all text-[14px] font-bold"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
              )}

              {activeTab === "tags" && (
                <div className="flex flex-col gap-4 pb-3">
                  <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] px-1">
                    Tags & Labels
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add #tag..."
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      className="flex-1 text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 text-[14px] font-bold placeholder:text-white/20"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    <button
                      onClick={async () => {
                        if (!newTagName.trim()) return;
                        try {
                          const res = await createTag(newTagName);
                          if (res.tag) {
                            setAllTags([...allTags, res.tag]);
                            if (!form.tags.find((t) => t._id === res.tag._id)) {
                              setForm({
                                ...form,
                                tags: [...form.tags, res.tag],
                              });
                            }
                            setNewTagName("");
                          }
                        } catch (err) {
                          showToast("Failed to create tag");
                        }
                      }}
                      className="px-6 py-4 bg-white text-[#1A1A1A] rounded-2xl font-black text-[13px] active:scale-95 transition-transform shadow-lg"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5 max-h-[140px] overflow-y-auto no-scrollbar">
                    {allTags.map((tag) => {
                      const isSelected = form.tags.some(
                        (t) => t._id === tag._id,
                      );
                      return (
                        <button
                          key={tag._id}
                          onClick={() => {
                            if (isSelected) {
                              setForm({
                                ...form,
                                tags: form.tags.filter(
                                  (t) => t._id !== tag._id,
                                ),
                              });
                            } else {
                              setForm({ ...form, tags: [...form.tags, tag] });
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all border active:scale-95 ${
                            isSelected
                              ? "bg-white text-[#1A1A1A] border-white shadow-md"
                              : "border-white/10 text-white/30 hover:border-white/20"
                          }`}
                          style={
                            !isSelected
                              ? { background: "rgba(255,255,255,0.04)" }
                              : {}
                          }
                        >
                          #{tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── Main action bar ── */}
            <div className={`flex items-center justify-between px-3 py-1.5`}>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleTab("add")}
                  className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-95 ${
                    activeTab === "add"
                      ? "bg-white text-[#1A1A1A]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <MdAdd size={24} />
                </button>
                <button className="w-11 h-11 flex items-center justify-center rounded-2xl text-white/40 hover:text-white transition-all active:scale-95">
                  <PiTextAUnderlineBold size={22} />
                </button>
                <button
                  onClick={() => toggleTab("color")}
                  className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-95 ${
                    activeTab === "color"
                      ? "bg-white text-[#1A1A1A]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <VscSymbolColor size={22} />
                </button>
                <button
                  onClick={() => toggleTab("tags")}
                  className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-95 ${
                    activeTab === "tags"
                      ? "bg-white text-[#1A1A1A]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <MdOutlineLabel size={22} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {!isDesktop && (
                  <button
                    onClick={() => toggleTab("menu")}
                    className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-95 ${
                      activeTab === "menu"
                        ? "bg-white text-[#1A1A1A]"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    <BsThreeDotsVertical size={20} />
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-3 bg-white text-[#1A1A1A] font-black text-[14px] rounded-2xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center min-w-[130px] shadow-lg"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-[3px] border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full animate-spin" />
                  ) : note ? (
                    "Sync Note"
                  ) : (
                    "Finalize"
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
