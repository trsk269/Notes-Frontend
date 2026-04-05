"use client";
import React, { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

import { loginSchema, registerSchema } from "../../validation/auth.schema";
import { login, register } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

interface AuthSwitchContainerProps {
  initialMode?: "login" | "register";
}

const AuthSwitchContainer: React.FC<AuthSwitchContainerProps> = ({
  initialMode = "login",
}) => {
  const router = useRouter();
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        loginSchema.parse(form);
        const res = await login(form.email, form.password);
        localStorage.setItem("token", res.token);
        await initializeAuth();
        router.push("/");
      } else {
        registerSchema.parse(form);
        await register(form.email, form.password);
        setIsLogin(true);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        setError((err as any)?.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-white rounded-3xl p-6 transition-all duration-500 ease-in-out">
      {/* Header Info */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-800">
          {isLogin ? "Login to account" : "Create new account"}
        </h3>
      </div>

      <div className="w-full flex flex-col">
        {error && (
          <div className="bg-red-50 text-red-500 text-xs font-medium px-4 py-2 rounded-lg mb-4 text-center border border-red-100 animate-shake">
            {error}
          </div>
        )}

        {/* Toggle with premium styling */}
        <div className="w-full h-12 p-1 rounded-2xl bg-gray-100 flex items-center mb-8 relative">
          <div
            className={`absolute h-10 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-out z-0 ${
              isLogin ? "translate-x-0" : "translate-x-full ml-1"
            }`}
          />
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 h-full z-10 font-bold text-sm transition-colors duration-300 ${
              isLogin ? "text-gray-800" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 h-full z-10 font-bold text-sm transition-colors duration-300 ${
              !isLogin ? "text-gray-800" : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl focus-within:ring-2 focus-within:ring-[#7DD3FC]/20 focus-within:border-[#7DD3FC]/50 transition-all">
              <div className="pl-4 pr-3 text-gray-400">
                <CiMail size={20} />
              </div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full py-4 pr-4 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Password
            </label>
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl focus-within:ring-2 focus-within:ring-[#7DD3FC]/20 focus-within:border-[#7DD3FC]/50 transition-all">
              <div className="pl-4 pr-3 text-gray-400">
                <TbLockPassword size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full py-4 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-300"
              />
              <button
                className="px-4 text-gray-300 hover:text-gray-500 transition-colors"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? (
                  <RiEyeFill size={18} />
                ) : (
                  <RiEyeCloseFill size={18} />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Confirm Password
              </label>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl focus-within:ring-2 focus-within:ring-[#6EE7B7]/20 focus-within:border-[#6EE7B7]/50 transition-all">
                <div className="pl-4 pr-3 text-gray-400">
                  <TbLockPassword size={20} />
                </div>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full py-4 pr-4 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-300"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <Link
                href="/reset-password"
                className="text-xs font-bold text-[#7DD3FC] hover:text-[#38BDF8] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-4 mt-2 rounded-2xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center ${
              isLogin
                ? "bg-[#7DD3FC] hover:shadow-[#7DD3FC]/30"
                : "bg-[#6EE7B7] hover:shadow-[#6EE7B7]/30"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isLogin ? (
              "Login Now"
            ) : (
              "Register Now"
            )}
          </button>

          {/* Social login */}
          <div className="flex items-center gap-4 my-4 opacity-50">
            <hr className="flex-1 border-gray-100" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Or continue with
            </span>
            <hr className="flex-1 border-gray-100" />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-all active:scale-95">
              <FcGoogle size={22} />
              <span className="text-sm font-bold text-gray-700">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSwitchContainer;
