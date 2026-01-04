"use client";

import { useAuthStore } from "@/src/store/auth.store";
import HomePage from "@/src/components/integrate/HomePage";
import OnboaringFlow from "@/src/components/modules/Onboarding/OnboaringFlow";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // ⏳ Prevent flicker while auth is bootstrapping
  if (isLoading) {
    return null; // or a spinner if you want
  }

  // ❌ Not logged in → onboarding
  if (!isAuthenticated) {
    return <OnboaringFlow />;
  }

  // ✅ Logged in → app
  return <HomePage />;
}
