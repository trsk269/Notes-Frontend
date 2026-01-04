"use client";

import { useEffect } from "react";
import { useAuthStore } from "../src/store/auth.store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
