import React from "react";
import Image from "next/image";
import logo from "../../../../assets/logo.png";

const SplashScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#F7F7F5]">
    <div className="flex flex-col items-center text-center">
      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center">
        <Image src={logo} alt="Noted" width={80} height={80} priority />
      </div>

      {/* Text */}
      <div className="mt-4">
        <p className="text-[20px] font-semibold text-[#111111] tracking-tight">
          Noted
        </p>
        <p className="text-[13px] text-[#A8A29E] mt-1">
          Your thoughts, organized
        </p>
      </div>
    </div>
  </div>
);

export default SplashScreen;
