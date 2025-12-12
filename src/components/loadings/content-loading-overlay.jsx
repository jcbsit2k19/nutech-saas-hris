import React from "react";
import LogoLoading from "./logo-loading";

export default function ContentLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 bg-slate-300/50 flex flex-col items-center justify-center">
      <LogoLoading />
    </div>
  );
}
