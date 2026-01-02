import React from "react";
import LogoPage from "./Slides/LogoPage";
import Intro from "./Slides/Intro";
import Authentication from "./Slides/Authentication";

const OnboaringFlow = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      {/* <LogoPage /> */}
      {/* <Intro /> */}
      <Authentication />
    </div>
  );
};

export default OnboaringFlow;
