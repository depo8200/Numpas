import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSandbox: () => void;
  onOpenTrial: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSandbox, onOpenTrial }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-xl font-bold tracking-tight text-stone-900 font-display hover:text-stone-700 transition-colors shrink-0"
        >
          Numpa
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#capabilities" className="hover:text-stone-900 transition-colors whitespace-nowrap">
            Capabilities
          </a>
          <a href="#forecasting" className="hover:text-stone-900 transition-colors whitespace-nowrap">
            Forecasting
          </a>
          <a href="#economics" className="hover:text-stone-900 transition-colors whitespace-nowrap">
            Unit Economics
          </a>
          <a href="#impact" className="hover:text-stone-900 transition-colors whitespace-nowrap">
            Impact
          </a>
          <a href="#pricing" className="hover:text-stone-900 transition-colors whitespace-nowrap">
            Pricing
          </a>
          <a href="#faq" className="hover:text-stone-900 transition-colors whitespace-nowrap">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenSandbox}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap"
          >
            Live Sandbox
          </button>
          <button
            onClick={onOpenTrial}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap shadow-xs"
          >
            Start Free Trial
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenTrial}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-md whitespace-nowrap"
          >
            Trial
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <a 
              href="#capabilities" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Capabilities
            </a>
            <a 
              href="#forecasting" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Forecasting
            </a>
            <a 
              href="#economics" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Unit Economics
            </a>
            <a 
              href="#impact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Impact
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSandbox();
              }}
              className="w-full py-2 text-xs font-semibold text-stone-800 bg-stone-200/80 rounded-md text-center"
            >
              Explore Live Sandbox
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-stone-900 rounded-md text-center"
            >
              Start Free Trial (14 Days)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
