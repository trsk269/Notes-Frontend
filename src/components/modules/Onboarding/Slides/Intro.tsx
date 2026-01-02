import React from "react";
import start_illustration from "../../../../assets/start_illustration.png";
import Image from "next/image";

const Intro = () => {
  return (
    <div className="w-full h-screen max-w-md flex flex-col">
      <div className="w-full h-[60%] border  flex items-center justify-center p-4">
        <Image
          src={start_illustration}
          alt="start_illustration"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full h-[40%] flex flex-col items-start justify-center p-4 gap-2">
        <h1 className="text-white text-[1.3rem] font-semibold">
          Effortlessly Manage Your Tasks and Boost Productivity
        </h1>
        <p className="text-[10px] text-gray-400">
          The ultimate task management app designed to streamline your workflow
          and supercharge your productivity.
        </p>

        <button className="w-full border border-white bg-black text-white text-sm font-semibold rounded-md p-2 mt-6">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Intro;
