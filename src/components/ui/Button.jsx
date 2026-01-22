import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
  disabled = false,
}) {
  const baseStyle =
    "rounded-xl font-black uppercase tracking-wider transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";

  const sizes = {
    default: "px-6 py-3 text-sm",
    sm: "px-4 py-2 text-xs",
    xs: "px-2 py-1 text-[10px]",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white border-red-800 active:translate-y-1 active:border-b-0",
    secondary:
      "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border-red-800 active:translate-y-1 active:border-b-0",
    outline:
      "bg-neutral-950 text-orange-500 border-black hover:bg-neutral-900 hover:text-orange-400 active:translate-y-1 active:border-b-0",
    ghost: "bg-transparent text-gray-400 hover:text-white border-transparent",
    flat: "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white border-b-0 active:scale-95 active:translate-y-0",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >
      {children}
    </button>
  );
}