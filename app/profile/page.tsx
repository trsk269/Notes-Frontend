"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../src/store/auth.store";
import { updateProfile, deleteAccount } from "../../src/services/user.service";
import {
  IoArrowBack,
  IoCameraOutline,
  IoTrashOutline,
  IoCheckmarkCircleOutline,
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
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setProfilePic(user.profilePic || "");
    }
  }, [user]);

  const handleBack = () => {
    router.back();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await updateProfile({ name, profilePic, username });
      setUser(res.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(true);
      // Artificial delay for smooth feel
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      logout();
      router.push("/login");
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to delete account",
      });
      setIsDeleting(false);
    }
  };

  const initial = (name || username || "U").charAt(0).toUpperCase();

  return (
    <main className="min-h-screen w-full bg-[#F9FAFB] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col gap-8 py-8 px-4 sm:px-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-3 bg-white text-gray-600 hover:text-[#7DD3FC] hover:bg-sky-50 rounded-2xl transition-all duration-300 shadow-sm border border-gray-100/50"
          >
            <IoArrowBack size={22} />
          </button>
          <h1 className="text-2xl font-black text-[#1F2937]">Profile</h1>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </header>

        {/* Profile Pic Section */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative group/photo">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-[#7DD3FC] to-[#6EE7B7] p-1 shadow-2xl shadow-sky-100 items-center justify-center flex overflow-hidden">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-[2.3rem]"
                />
              ) : (
                <span className="text-white text-5xl font-black">
                  {initial}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 p-3 bg-white text-[#1F2937] rounded-2xl shadow-xl shadow-sky-100 border border-gray-100 group-hover/photo:scale-110 group-hover/photo:bg-[#7DD3FC] group-hover/photo:text-white transition-all duration-300"
            >
              <IoCameraOutline size={22} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-[#1F2937]">
              {name || username || "Account User"}
            </h2>
            <p className="text-gray-400 font-medium">{user?.email}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">
              Email (Read-only)
            </label>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-medium overflow-hidden text-ellipsis">
              {user?.email}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="p-4 bg-white border border-gray-100 rounded-2xl text-[#1F2937] font-semibold outline-none focus:border-[#7DD3FC] focus:ring-4 focus:ring-sky-100 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Pick a username"
              className="p-4 bg-white border border-gray-100 rounded-2xl text-[#1F2937] font-semibold outline-none focus:border-[#6EE7B7] focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
            />
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 animate-in zoom-in-95 duration-300 ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              <IoCheckmarkCircleOutline size={20} />
              <span className="font-bold text-sm">{message.text}</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="mt-4 p-4 bg-gradient-to-r from-[#7DD3FC] to-[#6EE7B7] text-white font-black text-lg rounded-[1.8rem] shadow-xl shadow-sky-100 hover:shadow-2xl hover:shadow-sky-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 border-t border-gray-100 pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <label className="text-sm font-bold text-red-400 uppercase tracking-widest pl-1">
            Danger Zone
          </label>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="mt-4 w-full p-4 bg-white text-red-500 border border-red-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all duration-300 group"
            >
              <IoTrashOutline
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              Delete Account
            </button>
          ) : (
            <div className="mt-4 p-6 bg-red-50 border border-red-100 rounded-[2rem] flex flex-col gap-4 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col gap-1">
                <h3 className="text-red-600 font-extrabold text-lg">
                  Are you absolutely sure?
                </h3>
                <p className="text-red-500/80 text-sm font-medium leading-relaxed">
                  This will permanently delete your account and all your notes.
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 p-3 bg-white text-gray-600 font-bold rounded-xl border border-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 p-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all"
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
