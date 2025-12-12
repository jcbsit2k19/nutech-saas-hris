import React from "react";
import useTheme from "@hooks/useTheme";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";

export default function ThemeSwitch({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        group relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full 
        border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
        focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        bg-gray-200 dark:bg-slate-700 
        ${className}
      `}
      aria-label="Toggle Dark Mode"
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <span
        className={`
          pointer-events-none relative inline-block h-5 w-5 transform rounded-full 
          bg-white shadow-lg ring-0 transition duration-200 ease-in-out
          translate-x-1 dark:translate-x-5
        `}
      >
        <span
          className={`
            absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
            ${
              isDark
                ? "opacity-0 duration-100 ease-out"
                : "opacity-100 duration-200 ease-in"
            }
          `}
          aria-hidden="true"
        >
          <TbSunFilled className="h-3 w-3 text-yellow-500" />
        </span>
        <span
          className={`
            absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
            ${
              isDark
                ? "opacity-100 duration-200 ease-in"
                : "opacity-0 duration-100 ease-out"
            }
          `}
          aria-hidden="true"
        >
          <TbMoonFilled className="h-3 w-3 text-slate-700" />
        </span>
      </span>
    </button>
  );
}
