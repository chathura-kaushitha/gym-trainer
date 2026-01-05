import React from "react";

export default function Card({ children, title, icon: Icon, action, className = "" }) {
  return (
    <div
      className={`relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 shadow-2xl group overflow-hidden ${className}`}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500"></div>

      {(title || Icon) && (
        <div className="relative z-10 flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
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