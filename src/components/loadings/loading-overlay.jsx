import React from "react";
import LogoLoading from "./logo-loading";

export default function LoadingOverlay({ text }) {
  return (
    <div className="w-screen h-screen inset-0 fixed z-50 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center ">
      <LogoLoading />
      <p className="text-sm font-medium text-[#4892cf] drop-shadow-sm mt-22">
        {text?.toUpperCase() ?? "LOADING"}
      </p>
      <p className="text-xs text-[#4892cf] drop-shadow-sm">Please wait</p>
    </div>
  );
}
