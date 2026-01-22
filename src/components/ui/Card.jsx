import React from "react";

export default function Card({ children, title, icon: Icon, action, className = "" }) {
  return (
    <div
      className={`relative bg-gradient-to-br from-neutral-950 to-black border-2 border-neutral-900 rounded-2xl p-6 group overflow-hidden hover:border-red-900/30 transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {(title || Icon) && (
        <div className="relative z-10 flex items-center justify-between mb-6 border-b-2 border-neutral-900 pb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg">
                <Icon className="text-white w-5 h-5" />
              </div>
            )}
            {title && <h3 className="text-xl font-black text-white uppercase tracking-wide">{title}</h3>}
          </div>
          {action}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
