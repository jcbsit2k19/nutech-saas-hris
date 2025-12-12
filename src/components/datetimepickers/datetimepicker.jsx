import React, { useState, useRef } from "react";

export default function DateTimePicker({ label, icon: Icon, ...rest }) {
  const { onChange } = rest;
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleInvalid = (e) => {
    e.preventDefault();
    if (e.target.validity.valueMissing) {
      setError(`${label ?? "This field"} is required`);
    } else {
      setError(`Please select a valid date/time`);
    }
  };

  const handleChange = (e) => {
    if (error) setError(null);
    if (onChange) onChange(e);
  };

  const triggerPicker = () => {
    if (inputRef.current && inputRef.current.showPicker) {
      try {
        inputRef.current.showPicker();
      } catch (err) {
        console.log("Browser doesn't support programmatic picker opening");
      }
    }
  };

  return (
    <div className="w-full">
      {label && (
        <p className="text-xs mb-1 text-slate-700 dark:text-slate-300">
          {label}
        </p>
      )}

      <div
        className={`${
          error
            ? "border-red-500"
            : "dark:border-slate-600 border-slate-300 focus-within:border-blue-500 dark:focus-within:border-blue-400"
        } border rounded-md relative flex items-center transition-colors bg-white dark:bg-slate-800 cursor-text`}
        onClick={triggerPicker}
      >
        {Icon && (
          <div
            className="pl-3 text-slate-400 cursor-pointer"
            onClick={triggerPicker}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          ref={inputRef}
          type="datetime-local"
          {...rest}
          className={`
            w-full rounded-md outline-none p-2 text-sm bg-transparent
            dark:text-slate-200 text-slate-600 placeholder-slate-400
            font-inherit
            dark:scheme-dark
            [&::-webkit-calendar-picker-indicator]:opacity-50
            [&::-webkit-calendar-picker-indicator]:hover:opacity-100
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
            [&::-webkit-calendar-picker-indicator]:dark:invert
          `}
          onInvalid={handleInvalid}
          onChange={handleChange}
        />
      </div>
      {error && (
        <p className="text-xs mt-1 text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  );
}
