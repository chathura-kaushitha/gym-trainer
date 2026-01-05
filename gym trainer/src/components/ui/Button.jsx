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
    "px-6 py-2 rounded-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 border-b-4";

  const variants = {
    primary:
      "bg-orange-600 hover:bg-orange-500 text-white border-orange-800 shadow-[0_4px_0_rgb(154,52,18)] active:shadow-none active:translate-y-1 active:border-b-0",
    secondary:
      "bg-red-600 hover:bg-red-500 text-white border-red-800 shadow-[0_4px_0_rgb(153,27,27)] active:shadow-none active:translate-y-1 active:border-b-0",
    outline:
      "bg-neutral-800 text-orange-500 border-neutral-950 shadow-[0_4px_0_rgb(10,10,10)] hover:bg-neutral-700 active:shadow-none active:translate-y-1 active:border-b-0",
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