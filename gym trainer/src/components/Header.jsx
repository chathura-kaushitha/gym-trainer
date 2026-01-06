import React, { useState } from "react";
import { Dumbbell, Menu, X } from "lucide-react";
import Button from "./ui/Button.jsx";

export default function Header({ onLoginClick, onRegisterClick, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-800 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <Dumbbell className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-black uppercase italic">
              <span className="text-white">Gym</span>
              <span className="text-orange-500"> Trainer</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`font-semibold transition-colors ${
                  activeTab === link.id
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={onLoginClick} variant="primary" className="px-8 py-2">
              JOIN NOW
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-800 pt-4">
            <nav className="flex flex-col gap-4 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`font-semibold text-left transition-colors ${
                    activeTab === link.id
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <Button onClick={onLoginClick} variant="primary" className="w-full">
                JOIN NOW
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
