import React, { useState } from 'react';
import { Clock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

interface RoiEstimatorProps {
  onOpenTrial: () => void;
}

export const RoiEstimator: React.FC<RoiEstimatorProps> = ({ onOpenTrial }) => {
  const [teamSize, setTeamSize] = useState<number>(12);
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(24);
  const [hourlyRate, setHourlyRate] = useState<number>(85);

  // Calculations: Numpa automates ~80% of spreadsheet and reconciliation admin
  const hoursSavedPerMonth = Math.round(hoursPerMonth * 0.78);
  const annualHoursSaved = hoursSavedPerMonth * 12;
  const annualDollarValue = annualHoursSaved * hourlyRate;
  
  // Approximate Numpa annual cost for this team size
  const numpaAnnualCost = teamSize <= 3 ? 348 : teamSize <= 15 ? 948 : 2388;
  const netSavings = Math.max(0, annualDollarValue - numpaAnnualCost);
  const roiMultiple = numpaAnnualCost > 0 ? (annualDollarValue / numpaAnnualCost).toFixed(1) : '10';

  return (
    <section className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Operational ROI</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Time & Capital Recovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            Quantify the true cost of spreadsheet friction
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Manual bookkeeping, broken VLOOKUPs, and chasing overdue invoices silently 
            drain senior leadership capacity. Calculate your team's exact recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Input */}
          <div className="lg:col-span-6 bg-stone-50 p-6 sm:p-8 rounded-lg border border-stone-200 space-y-6">
            
            {/* Team Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="roiTeamSize" className="font-medium text-stone-700">Total Team Size</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  {teamSize} People
                </span>
              </div>
              <input
                id="roiTeamSize"
                type="range"
                min="1"
                max="60"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>1 person</span>
                <span>30 people</span>
                <span>60 people</span>
              </div>
            </div>

            {/* Monthly Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="roiHours" className="font-medium text-stone-700">Hours / Month Spent on Spreadsheets & Invoicing</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  {hoursPerMonth} Hours / mo
                </span>
              </div>
              <input
                id="roiHours"
                type="range"
                min="4"
                max="80"
                step="2"
                value={hoursPerMonth}
                onChange={(e) => setHoursPerMonth(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>4 hrs</span>
                <span>40 hrs</span>
                <span>80 hrs</span>
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="roiRate" className="font-medium text-stone-700">Blended Leadership / Finance Hourly Cost</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  ${hourlyRate}/hour
                </span>
              </div>
              <input
                id="roiRate"
                type="range"
                min="40"
                max="250"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>$40/hr</span>
                <span>$145/hr</span>
                <span>$250/hr</span>
              </div>
            </div>

          </div>

          {/* Results Card */}
          <div className="lg:col-span-6 bg-stone-900 text-white p-6 sm:p-8 rounded-lg space-y-6">
            
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Projected Annual Return with Numpa
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-stone-800/80 rounded border border-stone-700">
                <div className="text-xs text-stone-400 font-medium">Annual Working Hours Saved</div>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-white mt-1">
                  {annualHoursSaved} hrs
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  ~{hoursSavedPerMonth} hours returned / month
                </div>
              </div>

              <div className="p-4 bg-stone-800/80 rounded border border-stone-700">
                <div className="text-xs text-stone-400 font-medium">Productivity Value Recovered</div>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400 mt-1">
                  ${annualDollarValue.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  Net return after software: ${netSavings.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <span>Estimated ROI Multiple:</span>
              <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                {roiMultiple}x Annual Payback
              </span>
            </div>

            <button
              onClick={onOpenTrial}
              className="w-full py-3.5 px-4 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded transition-all flex items-center justify-center gap-2 group"
            >
              <span>Deploy Numpa & Reclaim {annualHoursSaved} Hours</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
