"use client";
import Link from "next/link";
import InputFields from "../molecules/InputFields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const registerValidationSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ pattern: z.regexes.html5Email }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerValidationSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerValidationSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    // Frontend simulation - just log the data
    console.log("Form submitted successfully:", data);
    alert("Registration successful! (Frontend simulation)");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col border border-gray-300 rounded-lg bg-white items-center justify-center p-8 shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <InputFields
            label="Name"
            name="name"
            type="text"
            register={register}
            error={errors.name}
          />
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
          <InputFields
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <div className="flex text-sm gap-1 justify-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
