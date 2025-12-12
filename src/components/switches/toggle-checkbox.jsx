import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

export default function ToggleCheckbox({
  checked,
  onChange,
  label = "",
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <div
        className={`
          group relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out 
          peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2
          ${checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-slate-700"}
        `}
      >
        <span
          className={`
            pointer-events-none relative inline-block h-5 w-5 transform rounded-full 
            bg-white shadow-lg ring-0 transition duration-200 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        >
          <span
            className={`
              absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
              ${
                checked
                  ? "opacity-0 duration-100 ease-out"
                  : "opacity-100 duration-200 ease-in"
              }
            `}
            aria-hidden="true"
          >
            <FiX className="h-3 w-3 text-slate-400" strokeWidth={3} />
          </span>

          <span
            className={`
              absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
              ${
                checked
                  ? "opacity-100 duration-200 ease-in"
                  : "opacity-0 duration-100 ease-out"
              }
            `}
            aria-hidden="true"
          >
            <FiCheck className="h-3 w-3 text-indigo-600" strokeWidth={3} />
          </span>
        </span>
      </div>

      {label && (
        <span className="ml-1 text-sm font-medium text-slate-500 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
}
