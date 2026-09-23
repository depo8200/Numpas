import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Direct Answers</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Frequently Asked</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Everything you need to know about adopting Numpa into your financial workflow.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm text-stone-600 leading-relaxed pr-6">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
