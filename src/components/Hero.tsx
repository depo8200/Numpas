import React, { useState } from 'react';
import { ArrowRight, Play, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SCENARIO_PRESETS } from '../data/mockData';

interface HeroProps {
  onOpenSandbox: () => void;
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSandbox, onOpenTrial }) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const currentPreset = SCENARIO_PRESETS[activePresetIndex];

  // Quick calculations for the hero interactive teaser card
  const netBurn = currentPreset.monthlyBurn - currentPreset.monthlyRevenue;
  const runwayMonths = netBurn <= 0 
    ? 999 
    : (currentPreset.cashInBank / netBurn);

  const formattedRunway = runwayMonths >= 999 
    ? 'Profitable (Infinite)' 
    : `${runwayMonths.toFixed(1)} Months`;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-stone-50 border-b border-stone-200">
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#171717 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 tracking-wide uppercase">
              <span>Financial Intelligence</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Modern Number Operations</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Zero Spreadsheets</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.08] font-display" style={{ textWrap: 'balance' }}>
              Numbers without the chaos. Built for operators.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Ditch fragile spreadsheet formulas and delayed bookkeeping cycles. 
              Numpa calculates your rolling cash runway, unit margins, and multi-currency ledgers 
              in real time with mathematical precision.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenTrial}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm hover:shadow group whitespace-nowrap"
              >
                <span>Start Free 14-Day Trial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-all whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current text-stone-700" />
                <span>Explore Live Sandbox</span>
              </button>
            </div>

            {/* Claim-to-proof adjacency */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  $184M+
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Operating expenses tracked
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  0
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Formula breakage errors
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  &lt; 28 min
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Average monthly close
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Architecture Teaser */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg border border-stone-300 shadow-md p-5 sm:p-6 space-y-5">
              
              {/* Card Header & Preset Selector */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Live Operational Model
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Continuous Sync</span>
                  </div>
                </div>

                {/* Preset switcher tabs */}
                <div className="mt-3 flex items-center gap-1 p-1 bg-stone-100 rounded-md">
                  {SCENARIO_PRESETS.slice(0, 3).map((preset, index) => (
                    <button
                      key={preset.id}
                      onClick={() => setActivePresetIndex(index)}
                      className={`flex-1 py-1.5 px-2 text-xs font-medium rounded transition-all text-center truncate ${
                        activePresetIndex === index
                          ? 'bg-white text-stone-900 shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {preset.id === 'studio' ? 'Design Studio' : preset.id === 'saas_seed' ? 'Seed SaaS' : 'Consultant'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Description */}
              <p className="text-xs text-stone-500 leading-snug">
                {currentPreset.description}
              </p>

              {/* Dynamic Metrics Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md">
                  <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                    Cash in Bank
                  </div>
                  <div className="text-lg font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                    ${currentPreset.cashInBank.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Across 2 primary accounts
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md">
                  <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                    Rolling Runway
                  </div>
                  <div className="text-lg font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                    {formattedRunway}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Dynamic cash drain
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md">
                  <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                    Monthly Revenue
                  </div>
                  <div className="text-lg font-bold text-emerald-700 font-mono tabular-nums mt-0.5">
                    +${currentPreset.monthlyRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>+{currentPreset.growthRate}% MoM</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md">
                  <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                    Monthly Burn
                  </div>
                  <div className="text-lg font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                    -${currentPreset.monthlyBurn.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Net: {netBurn > 0 ? `-$${netBurn.toLocaleString()}/mo` : `+$${Math.abs(netBurn).toLocaleString()}/mo`}
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Sparkline preview */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>12-Month Cash Trajectory</span>
                  <span className="font-mono text-[11px]">GAAP Projections</span>
                </div>
                
                <div className="h-16 w-full bg-stone-50 rounded border border-stone-200 p-1 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                    {/* Trajectory curve */}
                    <path
                      d={
                        netBurn <= 0 
                          ? "M 0 32 Q 50 28, 100 20 T 200 8" 
                          : runwayMonths > 12 
                            ? "M 0 10 Q 50 16, 100 24 T 200 32"
                            : "M 0 8 Q 50 20, 100 34 L 140 40 L 200 40"
                      }
                      fill="none"
                      stroke="#1c1917"
                      strokeWidth="2"
                    />
                    {/* Fill underneath */}
                    <path
                      d={
                        netBurn <= 0
                          ? "M 0 32 Q 50 28, 100 20 T 200 8 L 200 40 L 0 40 Z"
                          : runwayMonths > 12
                            ? "M 0 10 Q 50 16, 100 24 T 200 32 L 200 40 L 0 40 Z"
                            : "M 0 8 Q 50 20, 100 34 L 140 40 L 200 40 L 0 40 Z"
                      }
                      fill="#e7e5e4"
                      fillOpacity="0.4"
                    />
                  </svg>
                </div>
              </div>

              {/* Action anchor */}
              <a
                href="#forecasting"
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded text-center block transition-colors"
              >
                Open Full Interactive Forecasting Engine &darr;
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
