import React from 'react';

interface FooterProps {
  onOpenSandbox: () => void;
  onOpenTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSandbox, onOpenTrial }) => {
  return (
    <footer className="bg-white border-t border-stone-200 py-12 md:py-16 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-100">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xl font-bold tracking-tight text-stone-900 font-display block">
              Numpa
            </span>
            <p className="text-stone-500 leading-relaxed max-w-sm">
              The modern financial intelligence and number operations platform. 
              Real-time cash runway forecasting, automated unit economics, and multi-currency ledgers.
            </p>
            <div className="text-[11px] text-stone-600 font-mono">
              SOC2 Type II Certified · 256-bit TLS Bank Sync
            </div>
          </div>

          {/* Links Col 1: Product */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Platform
            </div>
            <ul className="space-y-2">
              <li><a href="#capabilities" className="hover:text-stone-900 transition-colors">Capabilities</a></li>
              <li><a href="#forecasting" className="hover:text-stone-900 transition-colors">Runway Simulator</a></li>
              <li><a href="#economics" className="hover:text-stone-900 transition-colors">Unit Economics</a></li>
              <li><button onClick={onOpenSandbox} className="hover:text-stone-900 transition-colors text-left">Live Sandbox</button></li>
            </ul>
          </div>

          {/* Links Col 2: Evidence */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Evidence
            </div>
            <ul className="space-y-2">
              <li><a href="#impact" className="hover:text-stone-900 transition-colors">Case Studies</a></li>
              <li><a href="#pricing" className="hover:text-stone-900 transition-colors">Pricing Tiers</a></li>
              <li><a href="#faq" className="hover:text-stone-900 transition-colors">FAQ</a></li>
              <li><span className="text-stone-600">GAAP Compliance</span></li>
            </ul>
          </div>

          {/* Links Col 3: Integrations */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Integrations
            </div>
            <ul className="space-y-2">
              <li><span className="text-stone-500">Plaid Open Banking</span></li>
              <li><span className="text-stone-500">Stripe Billing</span></li>
              <li><span className="text-stone-500">Mercury & Brex</span></li>
              <li><span className="text-stone-500">Gusto Payroll</span></li>
            </ul>
          </div>

          {/* CTA Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Get Started
            </div>
            <button
              onClick={onOpenTrial}
              className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
            >
              Start Free Trial
            </button>
            <div className="text-[10px] text-stone-600">
              14-day full access. No card required.
            </div>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-600 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Numpa Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-700 transition-colors">Security Architecture</a>
            <a href="#" className="hover:text-stone-700 transition-colors">System Status</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
