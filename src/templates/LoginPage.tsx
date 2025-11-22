"use client";

import Link from "next/link";
import InputFields from "../molecules/InputFields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Validation Schema
const loginValidationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginForm = z.infer<typeof loginValidationSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = (data: LoginForm) => {
    // Frontend simulation - just log the data
    console.log("Login successful:", data);
    alert("Login successful! (Frontend simulation)");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col border border-gray-300 rounded-lg bg-white items-center justify-center p-8 shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Login Now</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <InputFields
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <InputFields
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />

          <div className="flex justify-end">
            <Link
              href="/password-reset"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="flex text-sm gap-1 justify-center mt-4">
            <p className="text-gray-600">Don't have an account?</p>
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
