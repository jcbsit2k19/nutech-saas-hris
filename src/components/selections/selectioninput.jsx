import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function SelectInput({
  label,
  icon: Icon,
  options = [],
  placeholder = "Select an option",
  ...rest
}) {
  const { required, onChange, value } = rest;
  const [error, setError] = useState(null);

  const handleInvalid = (e) => {
    e.preventDefault();
    if (e.target.validity.valueMissing) {
      setError(`${label ?? "This field"} is required`);
    } else {
      setError("Please select an option");
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
        {Icon && (
          <div className="pl-3 text-slate-500">
            <Icon size={18} />
          </div>
        )}

        <div className="relative w-full">
          <select
            {...rest}
            onInvalid={handleInvalid}
            onChange={handleChange}
            className={`
              w-full appearance-none rounded-md outline-none p-2 text-sm bg-transparent
              dark:text-slate-300 text-slate-500 pr-10
              ${!value ? "text-slate-400" : ""}
            `}
            value={value}
          >
            <option
              value=""
              disabled
              className="bg-gray-100 dark:bg-slate-800 text-slate-400"
            >
              {placeholder}
            </option>

            {options.map((option, index) => (
              <option
                key={index}
                value={option.value}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <FiChevronDown size={18} />
          </div>
        </div>
      </div>
      {error && (
        <p className="text-xs mt-1 text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  );
}
