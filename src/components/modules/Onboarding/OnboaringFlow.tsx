"use client";
import React, { useState, useEffect } from "react";
import WelcomeAuth from "./Slides/WelcomeAuth";
import Authentication from "./Slides/Authentication";
import SplashScreen from "./Slides/SplashScreen";

const OnboardingFlow = () => {
  const [step, setStep] = useState<"splash" | "welcome" | "auth">("splash");
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    if (step === "splash") {
      const t = setTimeout(() => setStep("welcome"), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (step === "splash") return <SplashScreen />;

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
