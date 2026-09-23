import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentCase = CASE_STUDIES[activeTab];

  return (
    <section id="impact" className="py-20 md:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Verified Impact</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            Precision numbers. Verified business outcomes.
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            How modern agencies, clinical research teams, and software companies 
            replaced legacy accounting drag with real-time financial clarity.
          </p>
        </div>

        {/* Tab Navigation for Case Studies */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 overflow-x-auto">
          {CASE_STUDIES.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
              }`}
            >
              {cs.client}
            </button>
          ))}
        </div>

        {/* Active Case Study Spotlight */}
        <div className="mt-8 bg-white border border-stone-200 rounded-lg p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span>{currentCase.industry}</span>
                <span aria-hidden="true">·</span>
                <span>{currentCase.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-700 font-semibold">{currentCase.client}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight font-display">
                {currentCase.headline}
              </h3>

              <blockquote className="border-l-2 border-stone-900 pl-4 py-1 text-stone-700 text-sm sm:text-base italic leading-relaxed">
                "{currentCase.quote}"
              </blockquote>

              <div className="pt-2">
                <div className="text-sm font-semibold text-stone-900">
                  {currentCase.author}
                </div>
                <div className="text-xs text-stone-500">
                  {currentCase.role}, {currentCase.client}
                </div>
              </div>

            </div>

            {/* Right Quantitative Metrics Card */}
            <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-lg p-6 space-y-6">
              
              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Primary Outcome Metric
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-mono tabular-nums mt-1">
                  {currentCase.primaryMetric}
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  {currentCase.metricLabel}
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Supporting Verification
                </div>
                {currentCase.secondaryStats.map((stat, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between text-xs py-1 border-b border-stone-200/60 last:border-b-0">
                    <span className="text-stone-600">{stat.label}</span>
                    <span className="font-mono font-bold text-stone-900 tabular-nums">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-stone-500 pt-1">
                Audited operational ledger verified via quarterly banking records.
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
