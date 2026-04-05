import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onSkip: () => void;
  onStepClick: (step: number) => void;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onSkip,
  onStepClick,
}) => {
  return (
    <div className="w-full flex items-center justify-between p-6 bg-white z-10 border-b border-gray-50/50">
      {/* Back Button */}
      <div className="w-16">
        {currentStep > 1 && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-black transition-colors font-semibold py-2 group"
          >
            <IoIosArrowBack className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm">Back</span>
          </button>
        )}
      </div>

      {/* Progress Dots/Numbers - Interactive */}
      <div className="flex items-center gap-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <button
            key={step}
            onClick={() => onStepClick(step)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              currentStep === step
                ? "bg-[#6EE7B7] text-black shadow-md shadow-[#6EE7B7]/20"
                : "text-gray-300 hover:text-gray-500"
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Skip Button */}
      <div className="w-16 flex justify-end">
        {currentStep < totalSteps && (
          <button
            onClick={onSkip}
            className="text-gray-300 hover:text-gray-500 transition-colors font-semibold text-sm py-2"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingHeader;
