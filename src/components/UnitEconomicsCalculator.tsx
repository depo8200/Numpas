import React, { useState, useMemo } from 'react';
import { Calculator, Check, Copy, Sparkles, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';

interface EconomicsPreset {
  name: string;
  price: number;
  cost: number;
  cac: number;
  duration: number;
  cadence: 'monthly' | 'annual';
}

const PRESETS: Record<string, EconomicsPreset> = {
  agency: {
    name: 'Creative / Tech Agency Retainer',
    price: 8500,
    cost: 2800,
    cac: 4200,
    duration: 16,
    cadence: 'monthly',
  },
  saas: {
    name: 'B2B Mid-Market SaaS',
    price: 1200,
    cost: 180,
    cac: 2400,
    duration: 24,
    cadence: 'monthly',
  },
  productized: {
    name: 'Productized Design Service',
    price: 4950,
    cost: 1650,
    cac: 1800,
    duration: 9,
    cadence: 'monthly',
  },
  enterprise: {
    name: 'Enterprise Advisory / Consulting',
    price: 35000,
    cost: 9500,
    cac: 12000,
    duration: 12,
    cadence: 'monthly',
  },
};

export const UnitEconomicsCalculator: React.FC = () => {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('agency');
  const [dealValue, setDealValue] = useState<number>(8500);
  const [directCost, setDirectCost] = useState<number>(2800);
  const [cac, setCac] = useState<number>(4200);
  const [lifetimeMonths, setLifetimeMonths] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);

  const loadPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setSelectedPresetKey(key);
    setDealValue(p.price);
    setDirectCost(p.cost);
    setCac(p.cac);
    setLifetimeMonths(p.duration);
  };

  // Calculations
  const grossProfitPerMonth = Math.max(0, dealValue - directCost);
  const grossMarginPercent = dealValue > 0 ? (grossProfitPerMonth / dealValue) * 100 : 0;
  const ltv = grossProfitPerMonth * lifetimeMonths;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;
  const paybackMonths = grossProfitPerMonth > 0 ? cac / grossProfitPerMonth : 99;

  // Evaluation status
  const healthAssessment = useMemo(() => {
    if (ltvCacRatio >= 4 && paybackMonths <= 6) {
      return {
        level: 'Exceptional Unit Economics',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        note: 'Your customer economics are compounding profitably. You can aggressively reinvest gross profit into client acquisition channels.',
      };
    } else if (ltvCacRatio >= 3 && paybackMonths <= 12) {
      return {
        level: 'Healthy Growth Profile',
        color: 'text-stone-800 bg-stone-100 border-stone-200',
        note: 'Solid baseline margin. To unlock higher cash flow, optimize delivery cost per account or expand contract lifetime retention.',
      };
    } else {
      return {
        level: 'Tight Margin Alert',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        note: 'Your payback duration or acquisition cost is absorbing too much working capital. Consider adjusting packaging or pricing tiers.',
      };
    }
  }, [ltvCacRatio, paybackMonths]);

  const handleCopySummary = () => {
    const text = `Numpa Unit Economics Summary:
- Average Value: $${dealValue.toLocaleString()}/mo
- Direct Delivery Cost: $${directCost.toLocaleString()}/mo
- Gross Margin: ${grossMarginPercent.toFixed(1)}%
- Client Lifetime: ${lifetimeMonths} Months
- Customer LTV (Net Gross Profit): $${ltv.toLocaleString()}
- CAC: $${cac.toLocaleString()}
- LTV / CAC Ratio: ${ltvCacRatio.toFixed(1)}x
- Payback Period: ${paybackMonths.toFixed(1)} Months
- Status: ${healthAssessment.level}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="economics" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span>Financial Diagnostic</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Unit Economics Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              Calculate exact client LTV, CAC & gross margins
            </h2>
            <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base">
              Know the true contribution of every customer before committing team capacity. 
              Real unit metrics that bank underwriters and venture partners look for.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Breakdown' : 'Copy Metrics'}</span>
            </button>
          </div>
        </div>

        {/* Archetype Quick-Bar */}
        <div className="py-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-500 font-medium">Model by Business Model:</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRESETS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  selectedPresetKey === key
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sliders Input Column */}
          <div className="lg:col-span-5 bg-stone-50 p-6 rounded-lg border border-stone-200 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-display">
              01. Client Economics Variables
            </h3>

            {/* Monthly Contract Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="dealValue" className="font-medium text-stone-700">Average Revenue / Retainer</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  ${dealValue.toLocaleString()}/mo
                </span>
              </div>
              <input
                id="dealValue"
                type="range"
                min="500"
                max="50000"
                step="250"
                value={dealValue}
                onChange={(e) => {
                  setDealValue(Number(e.target.value));
                  setSelectedPresetKey('');
                }}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>$500</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Direct Delivery Cost */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="directCost" className="font-medium text-stone-700">Direct Delivery / Fulfillment Cost</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  ${directCost.toLocaleString()}/mo
                </span>
              </div>
              <input
                id="directCost"
                type="range"
                min="0"
                max="30000"
                step="200"
                value={directCost}
                onChange={(e) => {
                  setDirectCost(Number(e.target.value));
                  setSelectedPresetKey('');
                }}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>$0</span>
                <span>$15,000</span>
                <span>$30,000</span>
              </div>
            </div>

            {/* CAC */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="cac" className="font-medium text-stone-700">Customer Acquisition Cost (CAC)</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  ${cac.toLocaleString()}
                </span>
              </div>
              <input
                id="cac"
                type="range"
                min="100"
                max="25000"
                step="100"
                value={cac}
                onChange={(e) => {
                  setCac(Number(e.target.value));
                  setSelectedPresetKey('');
                }}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>$100</span>
                <span>$12,500</span>
                <span>$25,000</span>
              </div>
            </div>

            {/* Lifetime Months */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="lifetimeMonths" className="font-medium text-stone-700">Average Client Lifetime (Retention)</label>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  {lifetimeMonths} Months
                </span>
              </div>
              <input
                id="lifetimeMonths"
                type="range"
                min="3"
                max="48"
                step="1"
                value={lifetimeMonths}
                onChange={(e) => {
                  setLifetimeMonths(Number(e.target.value));
                  setSelectedPresetKey('');
                }}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>3 mo</span>
                <span>24 mo</span>
                <span>48 mo</span>
              </div>
            </div>

          </div>

          {/* Diagnostics Output Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  Gross Margin
                </div>
                <div className={`text-2xl font-bold font-mono tabular-nums mt-1 ${
                  grossMarginPercent >= 70 ? 'text-emerald-700' : 'text-stone-900'
                }`}>
                  {grossMarginPercent.toFixed(1)}%
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  ${grossProfitPerMonth.toLocaleString()} profit / month
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  Customer Net LTV
                </div>
                <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums mt-1">
                  ${ltv.toLocaleString()}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Cumulative gross profit
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  LTV / CAC Ratio
                </div>
                <div className={`text-2xl font-bold font-mono tabular-nums mt-1 ${
                  ltvCacRatio >= 4 ? 'text-emerald-700' : ltvCacRatio >= 3 ? 'text-stone-900' : 'text-amber-700'
                }`}>
                  {ltvCacRatio.toFixed(1)}x
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Target benchmark: &gt; 3.0x
                </div>
              </div>

            </div>

            {/* Payback Visual Breakdown */}
            <div className="p-6 bg-white border border-stone-200 rounded-lg space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-700">
                  CAC Payback Timeline
                </span>
                <span className="font-mono text-stone-900 font-bold">
                  {paybackMonths <= 0 ? 'Instant' : `${paybackMonths.toFixed(1)} Months to Break Even`}
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden border border-stone-200 flex">
                <div 
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (paybackMonths / lifetimeMonths) * 100)}%` }}
                  title="Payback period"
                />
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${Math.max(0, 100 - (paybackMonths / lifetimeMonths) * 100)}%` }}
                  title="Pure profit window"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <span>CAC Recovery ({paybackMonths.toFixed(1)} mo)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Pure Profit Contribution ({(Math.max(0, lifetimeMonths - paybackMonths)).toFixed(1)} mo)</span>
                </div>
              </div>
            </div>

            {/* Health Assessment Banner */}
            <div className={`p-4 rounded-lg border ${healthAssessment.color} space-y-1`}>
              <div className="text-xs font-bold uppercase tracking-wider">
                {healthAssessment.level}
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {healthAssessment.note}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
