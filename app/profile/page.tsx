"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../src/store/auth.store";
import { updateProfile, deleteAccount } from "../../src/services/user.service";
import {
  IoChevronBack,
  IoCameraOutline,
  IoTrashOutline,
  IoCheckmarkCircle,
  IoArchiveOutline,
} from "react-icons/io5";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setProfilePic(user.profilePic || "");
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        // Draw image on canvas
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress as JPEG with 0.9 quality (High Quality, Low File Size)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setProfilePic(compressedDataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSaved(false);
    try {
      const res = await updateProfile({ name, profilePic, username });
      setUser(res.user);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setTimeout(() => setIsLoading(false), 400);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      logout();
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Failed to delete account");
      setIsDeleting(false);
    }
  };

  const initial = (name || username || "U").charAt(0).toUpperCase();

  return (
    <main className="h-screen w-full bg-[#FAFAF8] flex flex-col items-center lg:items-stretch overflow-hidden overflow-y-auto transition-all duration-300">
      <div
        className={`w-full ${isDesktop ? "max-w-none px-12 pt-12" : "max-w-md"} h-full flex flex-col`}
      >
        {/* ── Mobile header ── */}
        {!isDesktop && (
          <div className="bg-[#1A1A1A] px-5 pt-5 pb-7 flex-shrink-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => router.back()}
                className="w-[34px] h-[34px] rounded-[11px] flex items-center justify-center active:scale-95 transition-transform"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <IoChevronBack size={16} color="rgba(255,255,255,0.6)" />
              </button>

              <span className="text-[11px] font-bold text-white/35 uppercase tracking-widest">
                Profile
              </span>

              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-[14px] py-[8px] rounded-[11px] text-[12px] font-bold tracking-tight transition-all active:scale-95 ${
                  saved ? "bg-[#22C55E] text-white" : "bg-white text-[#1A1A1A]"
                } disabled:opacity-60`}
              >
                {isLoading ? "Saving…" : saved ? "Saved" : "Save"}
              </button>
            </div>

            {/* Avatar + identity */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-[60px] h-[60px] bg-[#2E2E2E] rounded-[20px] border border-white/10 flex items-center justify-center overflow-hidden">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-[26px] font-extrabold">
                      {initial}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-[5px] -right-[5px] w-[22px] h-[22px] bg-white rounded-[8px] flex items-center justify-center active:scale-90 transition-transform"
                >
                  <IoCameraOutline size={12} color="#1A1A1A" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <p className="text-white text-[17px] font-extrabold tracking-tight leading-tight">
                  {name || username || "Account User"}
                </p>
                <p className="text-white/35 text-[11px] mt-0.5">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Desktop header ── */}
        {isDesktop && (
          <div className="flex items-center justify-between mb-10 w-full">
            <div className="flex flex-col">
              <h1 className="text-[42px] font-black text-[#1A1A1A] tracking-tightest leading-none">
                Settings
              </h1>
              <p className="text-[#B0ADA4] text-[16px] font-medium mt-3">
                Manage your account preferences and personal information.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-8 py-4 rounded-2xl text-[14px] font-bold tracking-tight transition-all active:scale-95 shadow-sm ${
                  saved ? "bg-[#22C55E] text-white" : "bg-[#1A1A1A] text-white"
                } disabled:opacity-60 min-w-[120px] flex items-center justify-center`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : saved ? (
                  "Changes Saved"
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── Main Body ── */}
        <div
          className={`flex-1 ${isDesktop ? "flex flex-col gap-10" : "flex flex-col gap-3 px-4 py-5"}`}
        >
          {/* Success toast */}
          {saved && !isDesktop && (
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[14px] px-4 py-3 flex items-center gap-3">
              <IoCheckmarkCircle size={16} color="#22C55E" />
              <span className="text-[12px] font-bold text-[#16A34A]">
                Profile updated successfully
              </span>
            </div>
          )}

          {/* Desktop Split Layout */}
          <div
            className={`${isDesktop ? "grid grid-cols-12 gap-12" : "flex flex-col gap-3"}`}
          >
            {/* Profile Card */}
            <div className={`${isDesktop ? "col-span-4" : "flex-shrink-0"}`}>
              <div
                className={`${isDesktop ? "bg-white border border-[#EDECE6] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]" : ""}`}
              >
                {isDesktop && (
                  <h3 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 px-1">
                    Avatar
                  </h3>
                )}
                <div
                  className={`${isDesktop ? "flex flex-col items-center gap-6" : ""}`}
                >
                  <div className="relative group">
                    <div
                      className={`${isDesktop ? "w-[140px] h-[140px]" : "hidden"} bg-[#F5F5F0] rounded-[48px] border-2 border-[#1A1A1A]/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#1A1A1A]/10`}
                    >
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#1A1A1A]/20 text-[56px] font-extrabold">
                          {initial}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`${isDesktop ? "absolute -bottom-2 -right-2 w-12 h-12 bg-[#1A1A1A] text-white" : "hidden"} rounded-2xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all`}
                    >
                      <IoCameraOutline size={22} />
                    </button>
                  </div>

                  {isDesktop && (
                    <div className="text-center">
                      <p className="text-[15px] font-bold text-[#1A1A1A] tracking-tight">
                        {name || username || "Account User"}
                      </p>
                      <p className="text-[12px] text-[#B0ADA4] mt-1 font-medium">
                        {user?.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div
              className={`${isDesktop ? "col-span-8 flex flex-col gap-8" : "flex flex-col gap-3"}`}
            >
              <div
                className={`${isDesktop ? "bg-white border border-[#EDECE6] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]" : ""}`}
              >
                {isDesktop && (
                  <h3 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-8 px-1">
                    Personal Details
                  </h3>
                )}
                <div
                  className={`${isDesktop ? "grid grid-cols-2 gap-8" : "flex flex-col gap-3"}`}
                >
                  <Field
                    label="Email"
                    readOnly
                    value={user?.email || ""}
                    isDesktop={isDesktop}
                  />
                  <div className="hidden lg:block" /> {/* spacer */}
                  <Field
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    isDesktop={isDesktop}
                  />
                  <Field
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    isDesktop={isDesktop}
                  />
                </div>
              </div>

              {/* Desktop Bottom Actions */}
              <div
                className={`${isDesktop ? "grid grid-cols-2 gap-8" : "flex flex-col gap-3"}`}
              >
                {/* Archive Card */}
                <button
                  onClick={() => router.push("/archive")}
                  className="group bg-white border border-[#EDECE6] rounded-[24px] p-6 flex items-center justify-between hover:border-[#1A1A1A]/10 active:scale-[0.98] transition-all shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] bg-[#F5F5F0] rounded-[16px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                      <IoArchiveOutline size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-bold text-[#1A1A1A] tracking-tight">
                        Archived Notes
                      </p>
                      <p className="text-[11px] text-[#B0ADA4] mt-0.5 font-medium">
                        Manage your vault
                      </p>
                    </div>
                  </div>
                  <IoChevronBack
                    size={16}
                    color="#C8C5BC"
                    className="rotate-180"
                  />
                </button>

                {/* Delete Card */}
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-white border border-[#FECACA]/60 rounded-[24px] p-6 flex items-center gap-4 hover:bg-[#FEF2F2]/30 active:scale-[0.98] transition-all shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
                  >
                    <div className="w-[48px] h-[48px] bg-[#FEF2F2] text-[#EF4444] rounded-[16px] flex items-center justify-center flex-shrink-0">
                      <IoTrashOutline size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-bold text-[#EF4444] tracking-tight">
                        Delete Account
                      </p>
                      <p className="text-[11px] text-[#F87171] mt-0.5 font-medium">
                        Permanently remove data
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[24px] p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <p className="text-[14px] font-black text-[#EF4444] tracking-tight">
                        Are you absolutely sure?
                      </p>
                      <p className="text-[11px] text-[#F87171] mt-1.5 leading-relaxed font-medium">
                        This permanently removes your account and all associated
                        notes. This cannot be undone.
                      </p>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-3 bg-white border border-[#FECACA] rounded-[14px] text-[12px] font-bold text-[#EF4444] active:scale-95 transition-transform"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex-1 py-3 bg-[#EF4444] rounded-[14px] text-[12px] font-bold text-white active:scale-95 transition-transform disabled:opacity-60"
                      >
                        {isDeleting ? "Deleting…" : "Yes, Delete Everything"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  isDesktop = false,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  isDesktop?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`text-[9px] font-black text-[#B0ADA4] uppercase tracking-widest ${isDesktop ? "pl-1" : "pl-0.5"}`}
      >
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-[14px] py-[13px] rounded-[14px] text-[13px] font-semibold outline-none border transition-all ${
          readOnly
            ? "bg-[#F5F5F0] border-[#EDECE6] text-[#B0ADA4] cursor-default"
            : "bg-white border-[#EDECE6] text-[#1A1A1A] focus:border-[#1A1A1A]/30 focus:ring-2 focus:ring-[#1A1A1A]/5"
        } ${isDesktop ? "py-4 text-[14px] border-2 focus:border-[#1A1A1A]/10" : ""}`}
      />
    </div>
  );
}
