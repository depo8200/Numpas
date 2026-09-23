import React, { useState, useMemo } from 'react';
import { Sliders, Download, RefreshCw, AlertCircle, CheckCircle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { CURRENCIES, SCENARIO_PRESETS } from '../data/mockData';
import { Currency, MonthProjection } from '../types';

export const RunwaySimulator: React.FC = () => {
  // Simulator State
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [cashInBank, setCashInBank] = useState<number>(350000);
  const [monthlyBurn, setMonthlyBurn] = useState<number>(45000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(32000);
  const [growthRate, setGrowthRate] = useState<number>(6);
  
  // Stress-test toggle modifiers
  const [hiringShock, setHiringShock] = useState<boolean>(false);
  const [marketingShock, setMarketingShock] = useState<boolean>(false);
  const [churnShock, setChurnShock] = useState<boolean>(false);

  // View state: 'chart' | 'table'
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const currencyConfig = CURRENCIES[selectedCurrency];

  // Apply scenario presets
  const applyPreset = (presetId: string) => {
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setCashInBank(Math.round(preset.cashInBank * currencyConfig.rate));
    setMonthlyBurn(Math.round(preset.monthlyBurn * currencyConfig.rate));
    setMonthlyRevenue(Math.round(preset.monthlyRevenue * currencyConfig.rate));
    setGrowthRate(preset.growthRate);
    setHiringShock(false);
    setMarketingShock(false);
    setChurnShock(false);
  };

  // Calculate monthly 12-month projections
  const projections: MonthProjection[] = useMemo(() => {
    const list: MonthProjection[] = [];
    let currentCash = cashInBank;
    let currentRev = monthlyRevenue;
    let baseBurn = monthlyBurn;

    // Apply modifiers
    if (hiringShock) {
      baseBurn += Math.round(18000 * currencyConfig.rate); // +2 team members
    }
    if (marketingShock) {
      baseBurn += Math.round(8000 * currencyConfig.rate); // ad boost
    }

    const effectiveGrowth = churnShock 
      ? Math.max(-5, growthRate - 8) 
      : marketingShock 
        ? growthRate + 4 
        : growthRate;

    const monthNames = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

    for (let i = 0; i < 12; i++) {
      const monthLabel = monthNames[i % 12];
      const rev = Math.round(currentRev);
      const exp = Math.round(baseBurn);
      const net = rev - exp;
      currentCash += net;

      list.push({
        monthIndex: i + 1,
        label: monthLabel,
        revenue: rev,
        expenses: exp,
        netCashFlow: net,
        endingCash: currentCash,
      });

      // Compound revenue growth
      currentRev = currentRev * (1 + effectiveGrowth / 100);
    }

    return list;
  }, [cashInBank, monthlyBurn, monthlyRevenue, growthRate, hiringShock, marketingShock, churnShock, currencyConfig.rate]);

  // Derived metrics
  const effectiveBurn = useMemo(() => {
    let b = monthlyBurn;
    if (hiringShock) b += Math.round(18000 * currencyConfig.rate);
    if (marketingShock) b += Math.round(8000 * currencyConfig.rate);
    return b;
  }, [monthlyBurn, hiringShock, marketingShock, currencyConfig.rate]);

  const netInitialBurn = effectiveBurn - monthlyRevenue;
  
  // Calculate exact runway month
  const runwayMonths = useMemo(() => {
    if (netInitialBurn <= 0) return 999; // Profitable from day 1
    // Find when endingCash reaches <= 0 in projections
    for (let i = 0; i < projections.length; i++) {
      if (projections[i].endingCash <= 0) {
        // Linear interpolation
        const prevCash = i === 0 ? cashInBank : projections[i - 1].endingCash;
        const monthBurn = projections[i].expenses - projections[i].revenue;
        const fractional = monthBurn > 0 ? prevCash / monthBurn : 0;
        return Number((i + Math.max(0, Math.min(1, fractional))).toFixed(1));
      }
    }
    // Check if cash stays above 0 through month 12
    const lastCash = projections[11].endingCash;
    const lastNet = projections[11].netCashFlow;
    if (lastNet >= 0) return 999; // reaches profitability!
    const additionalMonths = Math.max(0, lastCash / Math.abs(lastNet));
    return Number((12 + additionalMonths).toFixed(1));
  }, [projections, netInitialBurn, cashInBank]);

  // Break-even month
  const breakEvenMonth = useMemo(() => {
    const idx = projections.findIndex((p) => p.netCashFlow >= 0);
    if (idx === -1) return null;
    return `Month ${idx + 1} (${projections[idx].label})`;
  }, [projections]);

  // Copy forecast snapshot to clipboard
  const handleCopyForecast = () => {
    const summary = `Numpa Rolling Cash Forecast (${currencyConfig.code}):
- Starting Cash: ${currencyConfig.symbol}${cashInBank.toLocaleString()}
- Monthly Revenue: ${currencyConfig.symbol}${monthlyRevenue.toLocaleString()} (+${growthRate}% MoM)
- Monthly Expenses: ${currencyConfig.symbol}${effectiveBurn.toLocaleString()}
- Estimated Runway: ${runwayMonths >= 999 ? 'Cash Flow Positive / Infinite' : `${runwayMonths} Months`}
- Year-End Projected Cash: ${currencyConfig.symbol}${projections[11].endingCash.toLocaleString()}
- Break-Even: ${breakEvenMonth || 'Not within 12 months'}`;

    navigator.clipboard.writeText(summary);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  // SVG Chart math
  const minCash = Math.min(0, ...projections.map((p) => p.endingCash));
  const maxCash = Math.max(cashInBank, ...projections.map((p) => p.endingCash)) * 1.15;
  const range = maxCash - minCash || 1;

  const getSvgY = (val: number) => {
    const height = 180;
    const norm = (val - minCash) / range;
    return height - norm * height;
  };

  const zeroLineY = getSvgY(0);

  const pointsString = [
    `0,${getSvgY(cashInBank)}`,
    ...projections.map((p, idx) => {
      const x = ((idx + 1) / 12) * 560;
      const y = getSvgY(p.endingCash);
      return `${x},${y}`;
    }),
  ].join(' ');

  return (
    <section id="forecasting" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span>Interactive Engine</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>12-Month Projections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              Live Cash Runway & Burn Forecaster
            </h2>
            <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base">
              Slide variables, stress-test growth or sudden downturns, and watch your 
              cash inflection point calculate in real time.
            </p>
          </div>

          {/* Currency selector & Presets */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-stone-100 p-1 rounded-md">
              {(Object.keys(CURRENCIES) as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setSelectedCurrency(cur)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    selectedCurrency === cur
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyForecast}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{copiedStatus ? 'Copied Summary' : 'Copy Forecast'}</span>
            </button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="py-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-500">
            <Sliders className="w-3.5 h-3.5" />
            <span className="font-medium">Load Archetype Preset:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SCENARIO_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className="px-3 py-1 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 rounded text-xs transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Controls on Left, Visual Engine on Right */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-stone-50 p-6 rounded-lg border border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-display">
              01. Operating Inputs
            </h3>

            {/* Cash in Bank */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="cashInBank" className="font-medium text-stone-700">Cash in Bank</label>
                <span className="font-mono font-semibold text-stone-900 tabular-nums">
                  {currencyConfig.symbol}{cashInBank.toLocaleString()}
                </span>
              </div>
              <input
                id="cashInBank"
                type="range"
                min="20000"
                max="1500000"
                step="10000"
                value={cashInBank}
                onChange={(e) => setCashInBank(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>{currencyConfig.symbol}20k</span>
                <span>{currencyConfig.symbol}750k</span>
                <span>{currencyConfig.symbol}1.5M</span>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="monthlyRevenue" className="font-medium text-stone-700">Monthly Operating Revenue</label>
                <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                  +{currencyConfig.symbol}{monthlyRevenue.toLocaleString()}
                </span>
              </div>
              <input
                id="monthlyRevenue"
                type="range"
                min="0"
                max="180000"
                step="2500"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>{currencyConfig.symbol}0</span>
                <span>{currencyConfig.symbol}90k</span>
                <span>{currencyConfig.symbol}180k</span>
              </div>
            </div>

            {/* Monthly Operating Expenses (Burn) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="monthlyBurn" className="font-medium text-stone-700">Base Monthly Expenses (Payroll & Ops)</label>
                <span className="font-mono font-semibold text-stone-900 tabular-nums">
                  -{currencyConfig.symbol}{monthlyBurn.toLocaleString()}
                </span>
              </div>
              <input
                id="monthlyBurn"
                type="range"
                min="5000"
                max="200000"
                step="2500"
                value={monthlyBurn}
                onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>{currencyConfig.symbol}5k</span>
                <span>{currencyConfig.symbol}100k</span>
                <span>{currencyConfig.symbol}200k</span>
              </div>
            </div>

            {/* MoM Revenue Growth % */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="growthRate" className="font-medium text-stone-700">Expected MoM Revenue Growth</label>
                <span className="font-mono font-semibold text-stone-900 tabular-nums">
                  {growthRate >= 0 ? `+${growthRate}%` : `${growthRate}%`}
                </span>
              </div>
              <input
                id="growthRate"
                type="range"
                min="-5"
                max="25"
                step="1"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                <span>-5%</span>
                <span>+10%</span>
                <span>+25%</span>
              </div>
            </div>

            {/* Stress-Test Scenarios Section */}
            <div className="pt-3 border-t border-stone-200 space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Stress-Test Toggles
              </div>

              <label className="flex items-center justify-between p-2.5 bg-white border border-stone-200 rounded cursor-pointer hover:border-stone-300 transition-colors">
                <span className="text-xs text-stone-700">
                  <strong className="text-stone-900">Hire +2 Specialists</strong> (+{currencyConfig.symbol}{Math.round(18000 * currencyConfig.rate).toLocaleString()}/mo)
                </span>
                <input
                  type="checkbox"
                  checked={hiringShock}
                  onChange={(e) => setHiringShock(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white border border-stone-200 rounded cursor-pointer hover:border-stone-300 transition-colors">
                <span className="text-xs text-stone-700">
                  <strong className="text-stone-900">Marketing Expansion</strong> (+{currencyConfig.symbol}{Math.round(8000 * currencyConfig.rate).toLocaleString()}/mo, +4% growth)
                </span>
                <input
                  type="checkbox"
                  checked={marketingShock}
                  onChange={(e) => setMarketingShock(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white border border-stone-200 rounded cursor-pointer hover:border-stone-300 transition-colors">
                <span className="text-xs text-stone-700">
                  <strong className="text-stone-900">Market Contraction / Churn</strong> (-8% growth drag)
                </span>
                <input
                  type="checkbox"
                  checked={churnShock}
                  onChange={(e) => setChurnShock(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
              </label>
            </div>

          </div>

          {/* Visual Engine & Projections Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top KPI Scorecards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Runway KPI */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Estimated Runway
                </div>
                <div className={`text-2xl font-bold font-mono tabular-nums mt-1 ${
                  runwayMonths < 6 ? 'text-amber-700' : runwayMonths >= 999 ? 'text-emerald-700' : 'text-stone-900'
                }`}>
                  {runwayMonths >= 999 ? 'Infinite' : `${runwayMonths} Mo`}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {runwayMonths >= 999 
                    ? 'Cash flow positive model' 
                    : runwayMonths < 6 
                      ? 'Capital injection needed' 
                      : 'Healthy runway reserve'}
                </div>
              </div>

              {/* Net Monthly Cash Flow */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Current Net Cash Flow
                </div>
                <div className={`text-2xl font-bold font-mono tabular-nums mt-1 ${
                  netInitialBurn <= 0 ? 'text-emerald-700' : 'text-stone-900'
                }`}>
                  {netInitialBurn <= 0 
                    ? `+${currencyConfig.symbol}${Math.abs(netInitialBurn).toLocaleString()}` 
                    : `-${currencyConfig.symbol}${netInitialBurn.toLocaleString()}`}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Per month at current baseline
                </div>
              </div>

              {/* Break-Even / Projected Year-End */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Break-Even Horizon
                </div>
                <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums mt-1">
                  {breakEvenMonth ? breakEvenMonth.replace('Month ', 'M') : 'M12+'}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {breakEvenMonth ? 'Target crossover achieved' : 'Requires funding or margin lift'}
                </div>
              </div>

            </div>

            {/* Chart / Table View Switcher */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                12-Month Rolling Cash Position
              </div>
              <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    viewMode === 'chart'
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Trajectory Curve
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Monthly Ledger Table
                </button>
              </div>
            </div>

            {/* Chart View */}
            {viewMode === 'chart' ? (
              <div className="p-6 bg-white border border-stone-200 rounded-lg space-y-4">
                <div className="relative h-56 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 560 180" preserveAspectRatio="none">
                    {/* Zero line */}
                    {zeroLineY > 0 && zeroLineY < 180 && (
                      <line
                        x1="0"
                        y1={zeroLineY}
                        x2="560"
                        y2={zeroLineY}
                        stroke="#dc2626"
                        strokeDasharray="4 4"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* Horizontal reference guidelines */}
                    <line x1="0" y1="45" x2="560" y2="45" stroke="#f5f5f4" strokeWidth="1" />
                    <line x1="0" y1="90" x2="560" y2="90" stroke="#f5f5f4" strokeWidth="1" />
                    <line x1="0" y1="135" x2="560" y2="135" stroke="#f5f5f4" strokeWidth="1" />

                    {/* Fill polygon */}
                    <polygon
                      points={`0,180 0,${getSvgY(cashInBank)} ${pointsString} 560,180`}
                      fill="#f5f5f4"
                      opacity="0.6"
                    />

                    {/* Main cash path */}
                    <polyline
                      fill="none"
                      stroke="#1c1917"
                      strokeWidth="2.5"
                      points={pointsString}
                    />

                    {/* Data dots */}
                    {projections.map((p, idx) => {
                      const x = ((idx + 1) / 12) * 560;
                      const y = getSvgY(p.endingCash);
                      return (
                        <circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r="3.5"
                          className={p.endingCash <= 0 ? 'fill-red-600' : 'fill-stone-900'}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* X-axis months */}
                <div className="grid grid-cols-12 text-center text-[10px] text-stone-500 font-mono border-t border-stone-100 pt-2">
                  {projections.map((p, idx) => (
                    <span key={idx}>{p.label}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-stone-900"></span>
                      <span>Projected Cash Balance</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-red-500 border-dashed"></span>
                      <span>Zero-Cash Threshold</span>
                    </span>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums">
                    Final Month: {currencyConfig.symbol}{projections[11].endingCash.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              /* Table View */
              <div className="border border-stone-200 rounded-lg overflow-x-auto bg-white">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Month</th>
                      <th className="py-2.5 px-3 text-right">Revenue</th>
                      <th className="py-2.5 px-3 text-right">Burn</th>
                      <th className="py-2.5 px-3 text-right">Net Flow</th>
                      <th className="py-2.5 px-3 text-right">Ending Cash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {projections.map((row) => (
                      <tr key={row.monthIndex} className="hover:bg-stone-50/50">
                        <td className="py-2 px-3 font-sans font-medium text-stone-900">
                          {row.label} (M{row.monthIndex})
                        </td>
                        <td className="py-2 px-3 text-right text-emerald-700 tabular-nums">
                          +{currencyConfig.symbol}{row.revenue.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 text-right text-stone-700 tabular-nums">
                          -{currencyConfig.symbol}{row.expenses.toLocaleString()}
                        </td>
                        <td className={`py-2 px-3 text-right tabular-nums ${
                          row.netCashFlow >= 0 ? 'text-emerald-700 font-medium' : 'text-stone-700'
                        }`}>
                          {row.netCashFlow >= 0 ? '+' : ''}{currencyConfig.symbol}{row.netCashFlow.toLocaleString()}
                        </td>
                        <td className={`py-2 px-3 text-right tabular-nums font-semibold ${
                          row.endingCash <= 0 ? 'text-red-600' : 'text-stone-900'
                        }`}>
                          {currencyConfig.symbol}{row.endingCash.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Strategic Insight Alert */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-600 leading-relaxed">
                <strong className="text-stone-900 block font-semibold mb-0.5">
                  Strategic Runway Analysis:
                </strong>
                {runwayMonths >= 999 ? (
                  <span>
                    Your operational revenue comfortably surpasses your burn rate. You can safely deploy capital into talent expansion or product experimentation without immediate dilutive fundraising.
                  </span>
                ) : runwayMonths >= 12 ? (
                  <span>
                    You have <strong className="text-stone-900">{runwayMonths} months</strong> of runway. At your current growth trajectory of {growthRate}% MoM, target break-even will occur within this cycle.
                  </span>
                ) : (
                  <span>
                    Alert: Current runway stands at <strong className="text-stone-900">{runwayMonths} months</strong>. We recommend deferring discretionary capital expenditures or targeting milestone billing receivables recovery to extend cushion beyond 12 months.
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
