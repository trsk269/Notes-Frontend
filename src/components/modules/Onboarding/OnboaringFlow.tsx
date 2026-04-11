"use client";
import React, { useState, useEffect } from "react";
import WelcomeAuth from "./Slides/WelcomeAuth";
import Authentication from "./Slides/Authentication";
import SplashScreen from "./Slides/SplashScreen";
import DesktopOnboarding from "./Slides/DesktopOnboarding";

const OnboardingFlow = () => {
  const [step, setStep] = useState<"splash" | "welcome" | "auth">("splash");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (step === "splash") {
      const t = setTimeout(() => setStep("welcome"), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (step === "splash") return <SplashScreen />;

  // Desktop view: Single step after splash
  if (isDesktop) {
    return <DesktopOnboarding />;
  }

  // Mobile view: 2 steps after splash
  if (step === "welcome")
    return (
      <WelcomeAuth
        onLogin={() => {
          setIsLoginMode(true);
          setStep("auth");
        }}
        onRegister={() => {
          setIsLoginMode(false);
          setStep("auth");
        }}
      />
    );

  return (
    <Authentication
      initialLoginMode={isLoginMode}
      onBack={() => setStep("welcome")}
    />
  );
};

export default OnboardingFlow;
