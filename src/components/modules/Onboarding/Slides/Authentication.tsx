import React from "react";
import AuthSwitchContainer from "../../AuthSwitchContainer";

interface AuthenticationProps {
  initialLoginMode?: boolean;
}

const Authentication: React.FC<AuthenticationProps> = ({
  initialLoginMode = true,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-white overflow-y-auto">
      {/* Auth Form Container - Clean UI/UX without illustration */}
      <div className="w-full max-w-md flex flex-col animate-in slide-in-from-bottom duration-700">
        <div className="mb-2 text-center">
          <h2 className="text-4xl font-bold text-[#1F2937] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2 font-semibold">
            Please enter your details to continue
          </p>
        </div>

        <div className="w-full">
          <AuthSwitchContainer
            initialMode={initialLoginMode ? "login" : "register"}
          />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
