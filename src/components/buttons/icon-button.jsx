import Tooltip from "@components/addons/tooltip";
import React from "react";

export default function IconButton({
  onClick,
  icon: Icon,
  theme = "default",
  tooltip,
  tooltipPosition = "top",
}) {
  return (
    <Tooltip text={tooltip} position={tooltipPosition}>
      <div
        className={`cursor-pointer rounded-md border p-1 shadow-md w-6 ${getThemeStyle(
          theme
        )}`}
        onClick={onClick}
      >
        <Icon className="text-sm drop-shadow-lg" />
      </div>
    </Tooltip>
  );
}

function getThemeStyle(theme) {
  switch (theme.toLowerCase()) {
    case "green":
      return "bg-gradient-to-br from-green-300 to-green-100 border-green-500 text-green-500";
    case "blue":
      return "bg-gradient-to-br from-blue-300 to-blue-100 border-blue-500 text-blue-500";
    case "yellow":
      return "bg-gradient-to-br from-yellow-300 to-yellow-100 border-yellow-500 text-yellow-500";
    case "orange":
      return "bg-gradient-to-br from-orange-300 to-orange-100 border-orange-500 text-orange-500";
    case "red":
      return "bg-gradient-to-br from-red-300 to-red-100 border-red-500 text-red-500";
    case "purple":
      return "bg-gradient-to-br from-purple-300 to-purple-100 border-purple-500 text-purple-500";
    default:
      return "border-slate-300 text-slate-300 hover:bg-slate-300";
  }
}
