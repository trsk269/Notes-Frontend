"use client";
import React, { useState } from "react";
import LogoPage from "./Slides/LogoPage";
import WelcomeAuth from "./Slides/WelcomeAuth";
import Authentication from "./Slides/Authentication";
import OnboardingHeader from "./OnboardingHeader";

const OnboaringFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSkip = () => {
    setCurrentStep(3);
  };

  const handleLoginClick = () => {
    setIsLoginMode(true);
    nextStep();
  };

  const handleRegisterClick = () => {
    setIsLoginMode(false);
    nextStep();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden font-sans">
      {/* Centered container with max-width:md */}
      <div className="w-full h-full max-w-md flex flex-col bg-white shadow-2xl relative">
        {/* Shared Header */}
        <OnboardingHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={prevStep}
          onSkip={handleSkip}
          onStepClick={goToStep}
        />

        {/* Main Content Area */}
        <div className="flex-grow flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full">
            {currentStep === 1 && (
              <div
                className="animate-in fade-in duration-500 h-full"
                onClick={nextStep}
              >
                <LogoPage />
              </div>
            )}
            {currentStep === 2 && (
              <div className="animate-in slide-in-from-right duration-500 h-full">
                <WelcomeAuth
                  onLogin={handleLoginClick}
                  onRegister={handleRegisterClick}
                />
              </div>
            )}
            {currentStep === 3 && (
              <div className="animate-in slide-in-from-right duration-500 h-full">
                <Authentication initialLoginMode={isLoginMode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboaringFlow;
