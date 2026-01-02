import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import AuthSwitchContainer from "../../AuthSwitchContainer";

const Authentication = () => {
  return (
    <div className="relative w-full h-full max-w-md flex flex-col items-center justify-center p-4">
      <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-full absolute top-5 left-5 cursor-pointer">
        <IoMdArrowBack className="text-white" />
      </div>
      <AuthSwitchContainer />
    </div>
  );
};

export default Authentication;
