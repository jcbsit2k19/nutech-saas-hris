import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function TextInput({ label, icon: Icon, ...rest }) {
  const { type, onChange, name } = rest;
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInvalid = (e) => {
    e.preventDefault();
    if (e.target.validity.valueMissing) {
      setError(`${(label || name) ?? "This field"} is required`);
    } else {
      setError(`Please enter a valid ${type}`);
    }
  };

  const handleChange = (e) => {
    if (error) {
      setError(null);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const inputType = isPasswordVisible ? "text" : type;

  return (
    <div>
      {label && <p className="text-xs mb-1">{label}</p>}
      <div
        className={`${
          error
            ? "border-red-500"
            : "dark:border-slate-600 border-slate-300 focus-within:border-blue-500 dark:focus-within:border-blue-400"
        } overflow-hidden border rounded-md relative flex items-center transition-colors bg-white dark:bg-slate-800 cursor-text`}
      >
        {Icon && (
          <div className="pl-3 pr-2  text-slate-500">
            <Icon size={18} />
          </div>
        )}

        <input
          {...rest}
          type={inputType}
          className={`
            w-full outline-none p-2 text-sm bg-transparent
            dark:text-slate-300 text-slate-500
            ${type === "password" ? "pr-10" : ""} 
          `}
          onInvalid={handleInvalid}
          onChange={handleChange}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 cursor-pointer outline-none"
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs mt-1 text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  );
}
