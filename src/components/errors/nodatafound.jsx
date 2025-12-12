import React from "react";
import { FaBox } from "react-icons/fa6";

export default function NoDataFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-4">
      <FaBox className="text-5xl text-slate-400 mb-2" />
      <p className="text-slate-400 font-medium text-xs">No Data Found</p>
    </div>
  );
}
