import React from "react";
import Image from "next/image";
import illustration from "../../../../assets/start_illustration.png";
import logo from "../../../../assets/logo.png";
import AuthSwitchContainer from "../../AuthSwitchContainer";

const DesktopOnboarding: React.FC = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-white">
      {/* Left Column: Hero */}
      <div className="w-1/2 bg-[#1A1A1A] relative flex flex-col items-center justify-center p-12 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.02] -top-40 -right-40 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.02] -bottom-20 -left-20" />

        {/* Nav branding */}
        <div className="absolute top-10 left-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Image
              src={logo}
              alt="Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Notes
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-full max-w-[400px] aspect-square mb-12 transform hover:scale-105 transition-transform duration-700">
            <Image
              src={illustration}
              alt="Start Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-white text-5xl font-bold tracking-tighter text-center leading-[1.1]">
            All your ideas,
            <br />
            <span className="text-white/30">one place.</span>
          </h1>
          <p className="text-white/40 text-lg text-center mt-6 font-medium max-w-md leading-relaxed">
            Write, capture, and come back to what matters most. Your digital
            brain, perfectly organized.
          </p>
        </div>

        {/* Bottom dots like in ref */}
        {/* <div className="absolute bottom-12 flex gap-2">
            <div className="w-8 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div> */}
      </div>

      {/* Right Column: Auth Form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative">
        <div className="w-full max-w-[440px]">
          <div className="mb-8">
            <h2 className="text-[#1A1A1A] text-3xl font-bold tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-[#B0ADA4] text-base font-medium">
              Join thousands of people using Notes to stay organized.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDECE6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <AuthSwitchContainer />
          </div>
        </div>

        {/* Footer text */}
        {/* <div className="absolute bottom-10 text-[13px] text-[#B0ADA4] font-medium">
          Protected by reCAPTCHA and subject to our Privacy Policy and Terms.
        </div> */}
      </div>
    </div>
  );
};

export default DesktopOnboarding;
