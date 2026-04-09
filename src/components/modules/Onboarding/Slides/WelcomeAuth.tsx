import React from "react";
import Image from "next/image";
import illustration from "../../../../assets/start_illustration.png";

interface WelcomeAuthProps {
  onLogin: () => void;
  onRegister: () => void;
}

const WelcomeAuth: React.FC<WelcomeAuthProps> = ({ onLogin, onRegister }) => (
  <div className="w-full h-full flex flex-col overflow-hidden">
    {/* Dark hero */}
    <div className="flex-1 bg-[#1A1A1A] flex flex-col items-center justify-center px-8 pt-12 pb-8 relative overflow-hidden min-h-0">
      <div className="absolute w-64 h-64 rounded-full bg-white/[0.03] -top-20 -right-20" />
      <div className="absolute w-40 h-40 rounded-full bg-white/[0.03] -bottom-10 -left-10" />
      <div className="relative w-full max-w-[240px] aspect-square">
        <Image
          src={illustration}
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-white text-[26px] font-bold tracking-tight text-center mt-6 leading-tight">
        All your ideas,
        <br />
        one place.
      </h1>
      <p className="text-white/40 text-[13px] text-center mt-2 font-normal leading-relaxed">
        Write, capture, and come back to
        <br />
        what matters most.
      </p>
    </div>

    {/* Bottom sheet */}
    <div className="bg-white px-6 pt-6 pb-10 shrink-0">
      <p className="text-[#1A1A1A] text-[16px] font-semibold tracking-tight">
        Let's get started
      </p>
      <p className="text-[#B0ADA4] text-[13px] mt-1 mb-5">
        Create a free account or sign in.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onLogin}
          className="flex-1 py-4 bg-[#1A1A1A] text-white font-semibold text-[14px] rounded-2xl tracking-tight active:scale-[0.97] transition-transform"
        >
          Sign in
        </button>
        <button
          onClick={onRegister}
          className="flex-1 py-4 bg-[#F5F5F0] text-[#1A1A1A] font-semibold text-[14px] rounded-2xl border border-[#E8E5DC] tracking-tight active:scale-[0.97] transition-transform"
        >
          Create account
        </button>
      </div>
    </div>
  </div>
);

export default WelcomeAuth;
