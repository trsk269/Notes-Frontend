"use client";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

import {
  loginSchema,
  registerSchema,
  mfaSchema,
} from "../../validation/auth.schema";
import {
  login,
  register,
  verifyMFA,
  resendOtp,
} from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

type AuthStep = "FORM" | "MFA";

const AuthSwitchContainer = () => {
  const router = useRouter();
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

  const [isLogin, setIsLogin] = useState(true);
  const [authStep, setAuthStep] = useState<AuthStep>("FORM");
  const [mfaToken, setMfaToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mfaUserId, setMfaUserId] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* ---------------- SUBMIT (LOGIN / REGISTER) ---------------- */
  const handleSubmit = async () => {
    setError(null);

    try {
      if (isLogin) {
        loginSchema.parse(form);

        const res = await login(form.email, form.password);

        // 🚨 MFA required
        if (res.mfaRequired) {
          setMfaUserId(res.userId);
          setAuthStep("MFA");
          return;
        }

        // ✅ Direct login (no MFA)
        localStorage.setItem("token", res.token);
        await initializeAuth();
        router.push("/");
      } else {
        registerSchema.parse(form);

        await register(form.email, form.password);

        // ✅ After register → switch to login
        setIsLogin(true);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        setError((err as any)?.message || "Something went wrong");
      }
    }
  };

  /* ---------------- MFA VERIFY ---------------- */
  const handleVerifyMFA = async () => {
    setError(null);

    try {
      if (!mfaUserId) {
        setError("Session expired. Please login again.");
        return;
      }

      mfaSchema.parse({ token: mfaToken });

      const res = await verifyMFA(mfaUserId, mfaToken);

      localStorage.setItem("token", res.token);

      await initializeAuth();
      router.push("/");
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        setError((err as any)?.message || "Invalid MFA code");
      }
    }
  };

  const handleResendOtp = async () => {
    if (!mfaUserId || resendCooldown > 0) return;

    try {
      setResendLoading(true);
      setError(null);
      setInfoMessage(null);

      await resendOtp(mfaUserId);

      setInfoMessage("A new verification code has been sent to your email.");
      setResendCooldown(30); // ⏳ 30 seconds cooldown

      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err?.message || "Unable to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col border border-gray-400 text-gray-400 rounded-lg">
      <div className="w-full flex flex-col p-4">
        {error && (
          <p className="text-sm text-red-500 text-center mb-2">{error}</p>
        )}

        {/* 🔹 Toggle */}
        {authStep === "FORM" && (
          <div className="w-full h-[2.5rem] p-1 rounded-full bg-gray-300">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 h-full font-semibold rounded-l-full text-black ${
                isLogin ? "bg-gray-400" : "bg-gray-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 h-full font-semibold rounded-r-full text-black ${
                !isLogin ? "bg-gray-400" : "bg-gray-300"
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* 🔹 FORM STEP */}
        {authStep === "FORM" && (
          <div className="flex flex-col gap-4 mt-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Email Address</label>
              <div className="flex border border-gray-300 rounded-md">
                <div className="w-[10%] flex items-center justify-center">
                  <CiMail className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="w-[90%] p-2 outline-none text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Password</label>
              <div className="flex border border-gray-300 rounded-md">
                <div className="w-[10%] flex items-center justify-center">
                  <TbLockPassword className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Password"
                  className="w-[80%] p-2 outline-none text-gray-400"
                />
                <div
                  className="w-[10%] flex items-center justify-center cursor-pointer"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? (
                    <RiEyeFill className="text-gray-400" />
                  ) : (
                    <RiEyeCloseFill className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Confirm password */}
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="flex border border-gray-300 rounded-md">
                  <div className="w-[10%] flex items-center justify-center">
                    <TbLockPassword className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm Password"
                    className="w-[90%] p-2 outline-none"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <Link href="/reset-password" className="text-sm text-gray-500">
                forgot password?
              </Link>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gray-500 text-black font-semibold rounded-md p-2 mt-2"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            {/* Social login (kept intact) */}
            <div className="flex items-center gap-4 mt-4">
              <hr className="flex-1" />
              <span className="text-sm text-gray-500">Or login with</span>
              <hr className="flex-1" />
            </div>

            <div className="flex gap-2">
              <button className="w-1/2 bg-gray-500 text-black rounded-md p-2 text-sm">
                <FcGoogle className="inline mr-2 rounded-full" />
                Google
              </button>
              <button className="w-1/2 bg-gray-500 text-black rounded-md p-2 text-sm">
                <FaFacebook className="inline mr-2 text-blue-600" />
                Facebook
              </button>
            </div>
          </div>
        )}

        {/* 🔹 MFA STEP */}
        {authStep === "MFA" && (
          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-lg font-semibold text-center text-gray-800">
              Verify your email
            </h2>

            <p className="text-sm text-gray-500 text-center leading-relaxed">
              We’ve sent a 6-digit verification code to your registered email
              address.
              <br />
              <span className="text-gray-400">
                Didn’t receive it? Please check your spam or junk folder.
              </span>
            </p>

            {infoMessage && (
              <p className="text-sm text-green-600 text-center">
                {infoMessage}
              </p>
            )}

            <input
              type="text"
              maxLength={6}
              value={mfaToken}
              onChange={(e) => setMfaToken(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full border border-gray-300 rounded-md p-3 text-center tracking-widest text-lg text-gray-700"
            />

            <button
              onClick={handleVerifyMFA}
              className="w-full bg-black text-white font-semibold rounded-md p-2"
            >
              Verify
            </button>

            {/* 🔁 Resend OTP */}
            <button
              disabled={resendLoading || resendCooldown > 0}
              onClick={handleResendOtp}
              className={`text-sm text-center transition ${
                resendCooldown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:underline"
              }`}
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : resendLoading
                  ? "Resending..."
                  : "Resend verification code"}
            </button>

            <button
              onClick={() => setAuthStep("FORM")}
              className="text-sm text-gray-500 text-center"
            >
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSwitchContainer;
