import React, { useState } from "react";

export default function TextArea({ label, rows = 3, ...rest }) {
  const { onChange } = rest;
  const [error, setError] = useState(null);

  const handleInvalid = (e) => {
    e.preventDefault();
    if (e.target.validity.valueMissing) {
      setError(`${label ?? "This field"} is required`);
    } else {
      setError("Please enter valid text");
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

  return (
    <div>
      {label && <p className="text-xs mb-1">{label}</p>}
      <div
        className={`${
          error
            ? "border-red-500"
            : "dark:border-slate-600 border-slate-300 focus-within:border-blue-500 dark:focus-within:border-blue-400"
        } border rounded-md relative flex items-center transition-colors bg-white dark:bg-slate-800 cursor-text`}
      >
        <textarea
          {...rest}
          rows={rows}
          className="w-full rounded-md outline-none p-2 text-sm bg-transparent dark:text-slate-300 text-slate-500 resize-y"
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
