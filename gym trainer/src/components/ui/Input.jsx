import React from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  name,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-neutral-900/50 border-2 border-neutral-800 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all shadow-inner"
      />
    </div>
  );
}