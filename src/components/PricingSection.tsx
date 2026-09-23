import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan, cadence: 'monthly' | 'annual') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Transparent Pricing</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>No Hidden Surcharges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            Simple, predictable software tiers
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Every plan includes real-time bank reconciliation, 12-month rolling cash runway, 
            and zero-seat penalties.
          </p>

          {/* Monthly vs Annual Segmented Control */}
          <div className="mt-8 inline-flex items-center p-1 bg-stone-200/80 rounded-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                !isAnnual ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isAnnual ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-lg border p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  plan.isPopular
                    ? 'bg-white border-stone-900 shadow-lg relative'
                    : 'bg-white border-stone-200 shadow-xs hover:border-stone-300'
                }`}
              >
                {/* Popular Marker */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[11px] font-semibold px-3 py-0.5 rounded uppercase tracking-wider">
                    Most Selected for Teams
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono font-semibold text-stone-500 uppercase">
                    {plan.name}
                  </div>

                  <p className="text-xs text-stone-500 mt-2 min-h-[32px] leading-relaxed">
                    {plan.subtitle}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-stone-900 font-mono tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      / month {isAnnual ? '(billed annually)' : ''}
                    </span>
                  </div>

                  <div className="text-xs text-stone-700 font-medium mt-1">
                    {plan.maxRevenue} · Includes {plan.includedSeats} team seats
                  </div>

                  {/* Feature List */}
                  <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
                    <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      Included Capabilities
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-600">
                        <Check className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onSelectPlan(plan, isAnnual ? 'annual' : 'monthly')}
                    className={`w-full py-3 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                      plan.isPopular
                        ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                    }`}
                  >
                    <span>Get Started with {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-[11px] text-center text-stone-500 mt-2">
                    14-day trial · No credit card required
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Enterprise Bespoke Bar */}
        <div className="mt-12 p-6 bg-white border border-stone-200 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              Need custom ERP integrations, multi-entity rollups, or dedicated fractional CFO support?
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              We build custom ledger sync pipelines for NetSuite, SAP, and bespoke multi-currency treasury architectures.
            </p>
          </div>
          <button
            onClick={() => onSelectPlan(PRICING_PLANS[2], 'annual')}
            className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            Speak with Enterprise Engineering
          </button>
        </div>

      </div>
    </section>
  );
};
