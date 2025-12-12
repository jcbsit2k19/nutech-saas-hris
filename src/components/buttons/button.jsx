import React from "react";

const themeStyles = {
  green:
    "bg-green-500 hover:bg-green-600 text-white/80 dark:text-slate-800 focus-visible:ring-green-400",
  red: "bg-red-500 hover:bg-red-600 text-white/80 dark:text-slate-800 focus-visible:ring-red-400",
  yellow:
    "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 dark:text-slate-800 focus-visible:ring-yellow-400",
  orange:
    "bg-orange-500 hover:bg-orange-600 text-white/80 dark:text-slate-800 focus-visible:ring-orange-400",
  gray: "bg-gray-500 hover:bg-gray-600 text-white/80 dark:text-slate-800 focus-visible:ring-gray-400",
  blue: "bg-blue-500 hover:bg-blue-600 text-white/80 dark:text-slate-800 focus-visible:ring-blue-400",
};

export default function Button({
  children,
  icon: Icon,
  type = "button",
  fullWidth = false,
  color = "gray",
  ...rest
}) {
  return (
    <button
      type={type}
      {...rest}
      className={`group inline-flex items-center justify-center rounded-lg 
        px-5 py-2.5 font-semibold text-sm shadow-sm 
        transition-all duration-200 ease-in-out
        hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${fullWidth ? "w-full" : "max-w-fit"} 
        ${themeStyles[color]}
        `}
    >
      {Icon && (
        <Icon
          className="
            -ml-1 mr-2 h-5 w-5
            transition-transform duration-200 ease-in-out 
            group-hover:translate-x-1
          "
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </button>
  );
}
