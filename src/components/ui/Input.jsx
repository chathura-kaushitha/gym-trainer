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
        className="w-full bg-[#0F0F0F] border-2 border-[#2A2A2A] rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[rgb(220 38 38)] transition-all"
      />
    </div>
  );
}