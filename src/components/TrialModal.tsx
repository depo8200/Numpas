import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  billingCadence: 'monthly' | 'annual';
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  billingCadence,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [businessType, setBusinessType] = useState('Design / Creative Agency');
  const [currentTools, setCurrentTools] = useState('Spreadsheets (Excel / Sheets)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!workEmail.includes('@') || !workEmail.includes('.')) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }

    if (!companyName.trim()) {
      setErrorMessage('Company or studio name is required.');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant workspace provisioning
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCompanyName('');
    setWorkEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-xl border border-stone-300 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              {isSuccess ? 'Workspace Provisioned' : 'Start 14-Day Free Access'}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {selectedPlan ? `Selected: ${selectedPlan.name} (${billingCadence})` : 'All features included · No credit card required'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="space-y-5 text-center py-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-stone-900 font-display">
                  Welcome to Numpa, {companyName}!
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  Your secure environment has been staged. An instant onboarding link 
                  and API keys have been dispatched to <strong className="text-stone-900">{workEmail}</strong>.
                </p>
              </div>

              {/* Credentials / Sandbox Snapshot */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-stone-500">Instance ID:</span>
                  <span className="text-stone-900 font-semibold">numpa-inst-88219</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Workspace Domain:</span>
                  <span className="text-stone-900">{companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.numpa.app</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Trial Period:</span>
                  <span className="text-emerald-700 font-semibold">14 Days Active</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Company or Studio Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Design Co."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Operating Model
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="Design / Creative Agency">Design / Creative Agency</option>
                    <option value="SaaS / Software">SaaS / Software</option>
                    <option value="Solo Consultant / Specialist">Solo Consultant / Specialist</option>
                    <option value="E-commerce / DTC">E-commerce / DTC</option>
                    <option value="Holding Company / Other">Holding Company / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Current Bookkeeping
                  </label>
                  <select
                    value={currentTools}
                    onChange={(e) => setCurrentTools(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="Spreadsheets (Excel / Sheets)">Spreadsheets (Excel / Sheets)</option>
                    <option value="QuickBooks / Xero">QuickBooks / Xero</option>
                    <option value="Outsourced Bookkeeper">Outsourced Bookkeeper</option>
                    <option value="No Formal System">No Formal System</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 rounded transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{isSubmitting ? 'Creating Environment...' : 'Initialize Free Workspace'}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Encrypted with 256-bit bank TLS · Zero obligation</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
