import React from "react";
import Image from "next/image";
import logo from "../../../../assets/logo.png";

const LogoPage = () => {
  return (
    <div className="bg-white w-full h-full flex flex-col justify-center items-center p-8">
      <div className="relative group cursor-pointer transition-all duration-300 transform group-hover:scale-105 active:scale-95">
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#7DD3FC]/20 to-[#6EE7B7]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <Image
          src={logo}
          alt="Logo"
          width={300}
          height={300}
          className="relative drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
          priority
        />
      </div>

      <div className="mt-12 text-center animate-bounce-slow">
        <p className="text-gray-300 font-medium tracking-[0.2em] uppercase text-sm">
          Tap to start
        </p>
      </div>
    </div>
  );
};

export default LogoPage;
