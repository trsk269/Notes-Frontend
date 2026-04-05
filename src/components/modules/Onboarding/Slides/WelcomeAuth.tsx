import React from "react";
import Image from "next/image";
import start_illustration from "../../../../assets/start_illustration.png";

interface WelcomeAuthProps {
  onLogin: () => void;
  onRegister: () => void;
}

const WelcomeAuth: React.FC<WelcomeAuthProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-md mx-auto p-8 relative overflow-hidden">
      {/* Top Heading */}
      <div className="w-full mt-10">
        <h1 className="text-4xl font-bold text-[#1F2937] leading-tight tracking-tight">
          Good bye <br />
          book & pen
        </h1>
      </div>

      {/* Illustration Section */}
      <div className="relative w-full flex-grow flex items-center justify-center py-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />
        <div className="relative w-full aspect-square max-h-[350px] transform hover:scale-105 transition-transform duration-500 ease-out">
          {/* Subtle Sparkles decoration */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-[#7DD3FC] rounded-full animate-pulse opacity-60" />
          <div className="absolute top-20 right-5 w-3 h-3 bg-[#6EE7B7] rotate-45 animate-pulse opacity-60" />
          <div className="absolute bottom-10 left-20 w-2 h-2 bg-[#7DD3FC] rotate-12 animate-pulse opacity-40" />

          <Image
            src={start_illustration}
            alt="Welcome Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Text and Actions */}
      <div className="w-full mb-10 flex flex-col items-center gap-10">
        <div className="text-left w-full space-y-2">
          <h2 className="text-4xl font-bold text-[#1F2937] tracking-tight">
            Hello, Offered
          </h2>
          <p className="text-gray-400 text-lg font-medium">
            Keep your information in our app.
          </p>
        </div>

        <div className="flex w-full gap-4">
          <button
            onClick={onLogin}
            className="flex-1 py-4 px-6 bg-[#7DD3FC] text-[#1F2937] font-bold rounded-2xl text-lg hover:shadow-lg hover:shadow-[#7DD3FC]/20 active:scale-95 transition-all duration-200"
          >
            Log in
          </button>
          <button
            onClick={onRegister}
            className="flex-1 py-4 px-6 bg-[#6EE7B7] text-[#1F2937] font-bold rounded-2xl text-lg hover:shadow-lg hover:shadow-[#6EE7B7]/20 active:scale-95 transition-all duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAuth;
