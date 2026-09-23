import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, RefreshCw, Send, CheckCircle2, Globe, Clock, Layers } from 'lucide-react';

export const CapabilitiesBento: React.FC = () => {
  // Interactive widget 1: Bank Reconciliation
  const [reconciledItems, setReconciledItems] = useState<Record<string, boolean>>({
    'tx-1': true,
    'tx-2': false,
    'tx-3': true,
  });

  const toggleReconcile = (id: string) => {
    setReconciledItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive widget 2: Invoice Reminder Simulation
  const [invoiceSent, setInvoiceSent] = useState(false);

  // Interactive widget 3: FX Currency Active
  const [activeFx, setActiveFx] = useState<'EUR' | 'GBP' | 'JPY'>('EUR');

  const fxRates = {
    EUR: { rate: 0.92, amount: 12500, converted: 11500, feeSaved: 420 },
    GBP: { rate: 0.79, amount: 12500, converted: 9875, feeSaved: 510 },
    JPY: { rate: 154.5, amount: 12500, converted: 1931250, feeSaved: 380 },
  };

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with human editorial numbering */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Capabilities</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Architectural Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            The foundation of modern financial operations
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Engineered from first principles for founders, managing partners, and finance leads 
            who require verified cash truth without manual entry fatigue.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Autonomous Cash Reconciliation (col-span-2) */}
          <div className="md:col-span-2 bg-white rounded-lg border border-stone-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-stone-500">
                  01. Autonomous Cash Engine
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  256-bit Bank Feed
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-2 font-display">
                Self-Reconciling Bank & Stripe Feeds
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
                Connect your business accounts. Numpa automatically matches inbound invoices, 
                payroll debits, and software subscriptions against merchant ledgers with zero manual journal entries.
              </p>
            </div>

            {/* Interactive Micro-Ledger */}
            <div className="border border-stone-200 rounded-md overflow-hidden bg-stone-50">
              <div className="px-4 py-2.5 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between text-xs font-medium text-stone-600">
                <span>Live Feed Stream</span>
                <span className="text-[11px] font-mono text-stone-500">Click to reconcile test item</span>
              </div>
              <div className="divide-y divide-stone-200 text-xs">
                
                <div className="p-3.5 flex items-center justify-between bg-white hover:bg-stone-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <div>
                      <div className="font-semibold text-stone-900">Meridian Venture Fund — Series Seed Wire</div>
                      <div className="text-[11px] text-stone-500 font-mono">Plaid · Mercury · #WIRE-88912</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-semibold text-emerald-700 tabular-nums">+$500,000.00</span>
                    <button
                      onClick={() => toggleReconcile('tx-1')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        reconciledItems['tx-1']
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {reconciledItems['tx-1'] ? '✓ Reconciled' : 'Reconcile'}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between bg-white hover:bg-stone-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${reconciledItems['tx-2'] ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    <div>
                      <div className="font-semibold text-stone-900">Linear / Figma Enterprise — Annual Workspace</div>
                      <div className="text-[11px] text-stone-500 font-mono">Stripe Corporate · Card 4492</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-semibold text-stone-800 tabular-nums">-$4,200.00</span>
                    <button
                      onClick={() => toggleReconcile('tx-2')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        reconciledItems['tx-2']
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {reconciledItems['tx-2'] ? '✓ Reconciled' : 'Match & Reconcile'}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <span>Verified across 12,000+ banks worldwide</span>
              <span className="font-mono font-medium text-stone-700">SOC2 Type II Compliant</span>
            </div>
          </div>

          {/* Bento Card 2: Multi-Currency Global Treasury (col-span-1) */}
          <div className="bg-white rounded-lg border border-stone-200 p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-stone-500">
                02. Global Treasury
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-2 font-display">
                Real-Time Multi-Currency Ledger
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Receive client payments in EUR, GBP, or CAD without bank spread penalty. 
                Automatic ECB daily mid-market conversions.
              </p>
            </div>

            {/* Currency switcher mini-widget */}
            <div className="p-4 bg-stone-50 rounded-md border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">Select Currency</span>
                <div className="flex gap-1 bg-stone-200/80 p-0.5 rounded">
                  {(['EUR', 'GBP', 'JPY'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setActiveFx(curr)}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                        activeFx === curr ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-stone-500">Base Retainer: $12,500 USD</div>
                <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
                  {activeFx === 'EUR' ? '€' : activeFx === 'GBP' ? '£' : '¥'}
                  {fxRates[activeFx].converted.toLocaleString()} {activeFx}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                  <Check className="w-3 h-3" />
                  <span>Est. bank FX spread saved: ${fxRates[activeFx].feeSaved}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 leading-normal">
              Direct settlement into Wise, Mercury, and local multi-currency IBANs.
            </div>
          </div>

          {/* Bento Card 3: Automated Invoice Recovery & Aging (col-span-1) */}
          <div className="bg-white rounded-lg border border-stone-200 p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-stone-500">
                03. Receivables Engine
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-2 font-display">
                Automated AR Recovery & Aging
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Stop awkward email chasing. Numpa tracks client aging buckets and dispatches 
                polite automated payment links when net-30 terms approach.
              </p>
            </div>

            {/* Interactive Aging Pill / Notice */}
            <div className="p-4 bg-stone-50 rounded-md border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-700">Studio Apex — Invoice #402</span>
                <span className="text-amber-800 font-mono font-semibold">14 Days Overdue</span>
              </div>
              <div className="text-base font-bold font-mono text-stone-900 tabular-nums">
                $18,450.00
              </div>
              
              <button
                onClick={() => {
                  setInvoiceSent(true);
                  setTimeout(() => setInvoiceSent(false), 3000);
                }}
                disabled={invoiceSent}
                className="w-full py-2 px-3 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 disabled:bg-emerald-700 rounded transition-colors flex items-center justify-center gap-1.5"
              >
                {invoiceSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dispatched via Client Portal</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Frictionless One-Click Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-stone-500">
              Reduces average DSO (Days Sales Outstanding) from 44 days to 14 days.
            </div>
          </div>

          {/* Bento Card 4: Board-Ready Snapshots & GAAP Export (col-span-2) */}
          <div className="md:col-span-2 bg-white rounded-lg border border-stone-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-stone-500">
                  04. Investor & Board Reporting
                </span>
                <span className="text-xs font-medium text-stone-700 font-mono">
                  GAAP & IFRS Compliant
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-2 font-display">
                One-Click Executive P&L & Balance Sheet
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
                Generate clean, audited financial decks for your board, angel investors, or quarterly 
                partner reviews. Every number links directly down to its originating bank receipt.
              </p>
            </div>

            {/* P&L Snapshot Visual Table */}
            <div className="border border-stone-200 rounded-md overflow-hidden bg-white text-xs">
              <div className="grid grid-cols-4 p-3 bg-stone-50 border-b border-stone-200 font-semibold text-stone-600">
                <div className="col-span-2">Line Item</div>
                <div className="text-right">Q2 Actual</div>
                <div className="text-right">Q3 Projected</div>
              </div>
              <div className="divide-y divide-stone-100 font-mono">
                <div className="grid grid-cols-4 p-3 hover:bg-stone-50/50">
                  <div className="col-span-2 font-sans font-medium text-stone-900">Total Operating Revenue</div>
                  <div className="text-right text-emerald-700 tabular-nums">$324,800</div>
                  <div className="text-right text-emerald-700 tabular-nums">$410,000</div>
                </div>
                <div className="grid grid-cols-4 p-3 hover:bg-stone-50/50">
                  <div className="col-span-2 font-sans text-stone-600">Cost of Goods / Service Delivery</div>
                  <div className="text-right text-stone-700 tabular-nums">($82,400)</div>
                  <div className="text-right text-stone-700 tabular-nums">($98,000)</div>
                </div>
                <div className="grid grid-cols-4 p-3 bg-stone-50/80 font-bold">
                  <div className="col-span-2 font-sans text-stone-900">Gross Contribution Profit</div>
                  <div className="text-right text-stone-900 tabular-nums">$242,400 (74.6%)</div>
                  <div className="text-right text-stone-900 tabular-nums">$312,000 (76.1%)</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
              <span>Automatic quarterly sync to Google Drive & Notion financial hubs</span>
              <a href="#economics" className="font-semibold text-stone-900 hover:text-stone-700 inline-flex items-center gap-1">
                <span>Explore Unit Economics Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
