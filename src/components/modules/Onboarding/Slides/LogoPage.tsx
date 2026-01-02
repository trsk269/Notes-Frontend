import React from "react";
import Image from "next/image";
import logo from "../../../../assets/logo.png";

const LogoPage = () => {
  return (
    <div className="bg-black w-full h-full flex justify-center items-center">
      <Image src={logo} alt="Logo" width={250} height={250} />
    </div>
  );
};

export default LogoPage;
