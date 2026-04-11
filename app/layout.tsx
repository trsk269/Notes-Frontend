"use client";

import { useEffect } from "react";
import { useAuthStore } from "../src/store/auth.store";
import "./globals.css";
import Sidebar from "../src/components/modules/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#FAFAF8] overflow-x-hidden transition-colors">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 transition-all duration-300 w-full`}>
          {children}
        </main>
      </body>
    </html>
  );
}
