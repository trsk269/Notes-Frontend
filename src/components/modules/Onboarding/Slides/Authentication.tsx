import React from "react";
import AuthSwitchContainer from "../../AuthSwitchContainer";
import { IoChevronBack } from "react-icons/io5";

interface AuthenticationProps {
  initialLoginMode?: boolean;
  onBack: () => void;
}

const Authentication: React.FC<AuthenticationProps> = ({
  initialLoginMode = true,
  onBack,
}) => (
  <div className="w-full h-full flex flex-col overflow-hidden">
    {/* Dark header */}
    <div className="bg-[#1A1A1A] px-5 pt-5 pb-7 shrink-0">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors mb-5 active:scale-95"
      >
        <IoChevronBack size={16} />
        <span className="text-[13px] font-medium">Back</span>
      </button>
      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mb-1">
        {initialLoginMode ? "Welcome back" : "Get started"}
      </p>
      <h2 className="text-white text-[24px] font-bold tracking-tight leading-tight">
        {initialLoginMode ? "Sign in to\nyour notes" : "Create your\naccount"}
      </h2>
    </div>

    {/* Form */}
    <div className="flex-1 overflow-y-auto bg-white">
      <AuthSwitchContainer
        initialMode={initialLoginMode ? "login" : "register"}
      />
    </div>
  </div>
);

export default Authentication;
