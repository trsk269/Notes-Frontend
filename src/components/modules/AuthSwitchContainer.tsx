"use client";
import React, { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "../../validation/auth.schema";
import { login, register } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

interface AuthSwitchContainerProps {
  initialMode?: "login" | "register";
}

const Field = ({
  label,
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
  right,
}: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold text-[#999] uppercase tracking-widest">
      {label}
    </label>
    <div className="flex items-center bg-[#F8F8F5] border border-[#EDECE6] rounded-2xl focus-within:border-[#1A1A1A]/30 focus-within:ring-2 focus-within:ring-[#1A1A1A]/5 transition-all">
      <div className="pl-4 pr-3 text-[#C0BDB4]">
        <Icon size={18} />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3.5 bg-transparent outline-none text-[#1A1A1A] text-[14px] font-medium placeholder:text-[#C8C5BC]"
      />
      {right}
    </div>
  </div>
);

const AuthSwitchContainer: React.FC<AuthSwitchContainerProps> = ({
  initialMode = "login",
}) => {
  const router = useRouter();
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

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
      setError(
        err instanceof ZodError
          ? err.issues[0].message
          : (err as any)?.message || "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5 pt-5 pb-8 flex flex-col gap-4">
      {/* Toggle */}
      <div className="flex bg-[#F5F5F0] rounded-2xl p-1">
        {["Sign in", "Register"].map((label, i) => {
          const active = i === 0 ? isLogin : !isLogin;
          return (
            <button
              key={label}
              onClick={() => setIsLogin(i === 0)}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold tracking-tight transition-all duration-200 ${
                active ? "bg-[#1A1A1A] text-white shadow-sm" : "text-[#999]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 text-[12px] font-medium px-4 py-2.5 rounded-xl border border-red-100 text-center">
          {error}
        </div>
      )}

      <Field
        label="Email"
        icon={CiMail}
        type="email"
        value={form.email}
        onChange={(e: any) => setForm({ ...form, email: e.target.value })}
        placeholder="you@example.com"
      />

      <Field
        label="Password"
        icon={TbLockPassword}
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        placeholder="••••••••"
        right={
          <button
            className="px-4 text-[#C0BDB4] hover:text-[#888] transition-colors"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? (
              <RiEyeFill size={16} />
            ) : (
              <RiEyeCloseFill size={16} />
            )}
          </button>
        }
      />

      {!isLogin && (
        <Field
          label="Confirm password"
          icon={TbLockPassword}
          type="password"
          value={form.confirmPassword}
          onChange={(e: any) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          placeholder="••••••••"
        />
      )}

      {isLogin && (
        <Link
          href="/reset-password"
          className="text-[12px] font-semibold text-[#999] hover:text-[#1A1A1A] transition-colors text-right"
        >
          Forgot password?
        </Link>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-4 mt-1 rounded-2xl bg-[#1A1A1A] text-white font-semibold text-[14px] tracking-tight shadow-sm active:scale-[0.97] transition-transform disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : isLogin ? (
          "Sign in"
        ) : (
          "Create account"
        )}
      </button>

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-[#EDECE6]" />
        <span className="text-[10px] font-semibold text-[#C0BDB4] uppercase tracking-widest">
          or
        </span>
        <hr className="flex-1 border-[#EDECE6]" />
      </div>

      <button className="w-full py-3.5 bg-[#F8F8F5] border border-[#EDECE6] rounded-2xl flex items-center justify-center gap-2.5 text-[13px] font-semibold text-[#1A1A1A] active:scale-[0.97] transition-transform">
        <FcGoogle size={18} />
        Continue with Google
      </button>
    </div>
  );
};

export default AuthSwitchContainer;
