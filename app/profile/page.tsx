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

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    reader.onloadend = () => setProfilePic(reader.result as string);
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
    <main className="h-screen w-full bg-[#FAFAF8] flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-md h-full flex flex-col">
        {/* ── Dark hero header ── */}
        <div className="bg-[#1A1A1A] px-5 pt-5 pb-7 flex-shrink-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => router.back()}
              className="w-[34px] h-[34px] bg-white/8 rounded-[11px] flex items-center justify-center active:scale-95 transition-transform"
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
              <p className="text-white/35 text-[11px] mt-0.5">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
          {/* Success toast */}
          {saved && (
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[14px] px-4 py-3 flex items-center gap-3">
              <IoCheckmarkCircle size={16} color="#22C55E" />
              <span className="text-[12px] font-bold text-[#16A34A]">
                Profile updated successfully
              </span>
            </div>
          )}

          {/* Error toast */}
          {error && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[14px] px-4 py-3">
              <span className="text-[12px] font-bold text-[#EF4444]">
                {error}
              </span>
            </div>
          )}

          {/* Fields */}
          <Field label="Email" readOnly value={user?.email || ""} />
          <Field
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
          <Field
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
          />

          {/* Notes management */}
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[9px] font-bold text-[#B0ADA4] uppercase tracking-widest pl-0.5">
              Notes
            </span>
            <button
              onClick={() => router.push("/archive")}
              className="w-full bg-white border border-[#EDECE6] rounded-[16px] px-[14px] py-[13px] flex items-center justify-between active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] bg-[#F5F5F0] rounded-[12px] flex items-center justify-center flex-shrink-0">
                  <IoArchiveOutline size={17} color="#888" />
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#1A1A1A] tracking-tight">
                    Archived Notes
                  </p>
                  <p className="text-[10px] text-[#B0ADA4] mt-0.5">
                    View and restore hidden notes
                  </p>
                </div>
              </div>
              <IoChevronBack size={14} color="#C8C5BC" className="rotate-180" />
            </button>
          </div>

          {/* Danger zone */}
          <div className="mt-1">
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full bg-white border border-[#FECACA] rounded-[16px] px-[14px] py-[13px] flex items-center gap-3 active:scale-[0.98] transition-transform"
              >
                <div className="w-[36px] h-[36px] bg-[#FEF2F2] rounded-[12px] flex items-center justify-center flex-shrink-0">
                  <IoTrashOutline size={16} color="#EF4444" />
                </div>
                <span className="text-[13px] font-bold text-[#EF4444] tracking-tight">
                  Delete account
                </span>
              </button>
            ) : (
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[16px] p-[14px] flex flex-col gap-3">
                <div>
                  <p className="text-[13px] font-extrabold text-[#EF4444] tracking-tight">
                    Delete your account?
                  </p>
                  <p className="text-[11px] text-[#F87171] mt-1 leading-relaxed">
                    This permanently removes your account and all notes. This
                    cannot be undone.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-[10px] bg-white border border-[#EDECE6] rounded-[11px] text-[12px] font-bold text-[#888] active:scale-95 transition-transform"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex-1 py-[10px] bg-[#EF4444] rounded-[11px] text-[12px] font-bold text-white active:scale-95 transition-transform disabled:opacity-60"
                  >
                    {isDeleting ? "Deleting…" : "Yes, delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Field atom ── */
function Field({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[5px]">
      <span className="text-[9px] font-bold text-[#B0ADA4] uppercase tracking-widest pl-0.5">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-[14px] py-[12px] rounded-[14px] text-[13px] font-semibold outline-none border transition-all ${
          readOnly
            ? "bg-[#F5F5F0] border-[#EDECE6] text-[#B0ADA4] cursor-default"
            : "bg-white border-[#EDECE6] text-[#1A1A1A] focus:border-[#1A1A1A]/30 focus:ring-2 focus:ring-[#1A1A1A]/5"
        }`}
      />
    </div>
  );
}
