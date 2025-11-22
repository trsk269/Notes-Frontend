"use client";

import Link from "next/link";
import InputFields from "../molecules/InputFields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Validation Schema
const passwordResetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type PasswordResetForm = z.infer<typeof passwordResetSchema>;

export default function PasswordResetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetForm>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = (data: PasswordResetForm) => {
    // Frontend simulation
    console.log("Password reset email sent to:", data.email);
    alert("Password reset email sent! (Frontend simulation)");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col border border-gray-300 rounded-lg bg-white items-center justify-center p-8 shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <InputFields
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="flex text-sm gap-1 justify-center mt-4">
            <p className="text-gray-600">Remember your password?</p>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
