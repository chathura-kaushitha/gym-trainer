import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) {
  const baseStyle =
    "px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 border-b-4";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-orange-800 shadow-xl shadow-orange-600/50 active:shadow-none active:translate-y-1 active:border-b-0",
    secondary:
      "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border-red-800 shadow-xl shadow-red-600/50 active:shadow-none active:translate-y-1 active:border-b-0",
    outline:
      "bg-neutral-950 text-orange-500 border-black hover:bg-neutral-900 hover:text-orange-400 shadow-xl shadow-black/50 active:shadow-none active:translate-y-1 active:border-b-0",
    ghost: "bg-transparent text-gray-400 hover:text-white border-transparent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}