import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { RunwaySimulator } from './components/RunwaySimulator';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';
import { CaseStudies } from './components/CaseStudies';
import { RoiEstimator } from './components/RoiEstimator';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LiveSandboxModal } from './components/LiveSandboxModal';
import { TrialModal } from './components/TrialModal';
import { PricingPlan } from './types';
import { PRICING_PLANS } from './data/mockData';

export default function App() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(PRICING_PLANS[1]); // Default to Growth Engine
  const [billingCadence, setBillingCadence] = useState<'monthly' | 'annual'>('annual');

  const handleOpenSandbox = () => {
    setIsSandboxOpen(true);
  };

  const handleCloseSandbox = () => {
    setIsSandboxOpen(false);
  };

  const handleOpenTrial = (plan?: PricingPlan, cadence?: 'monthly' | 'annual') => {
    if (plan) setSelectedPlan(plan);
    if (cadence) setBillingCadence(cadence);
    setIsTrialOpen(true);
  };

  const handleCloseTrial = () => {
    setIsTrialOpen(false);
  };

  const handleSelectPlan = (plan: PricingPlan, cadence: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    setBillingCadence(cadence);
    setIsTrialOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col font-sans">
      {/* 3-Zone Navigation Header */}
      <Header 
        onOpenSandbox={handleOpenSandbox} 
        onOpenTrial={() => handleOpenTrial()} 
      />

      <main className="flex-1">
        {/* Hero Section with Interactive Teaser */}
        <Hero 
          onOpenSandbox={handleOpenSandbox} 
          onOpenTrial={() => handleOpenTrial()} 
        />

        {/* Bento Grid Capabilities with Live Interactive Micro-Tools */}
        <CapabilitiesBento />

        {/* 12-Month Runway & Burn Projection Engine */}
        <RunwaySimulator />

        {/* Unit Economics, Margin & LTV/CAC Diagnostic */}
        <UnitEconomicsCalculator />

        {/* Attributable Quantitative Case Studies */}
        <CaseStudies />

        {/* Hours & Capital Saved ROI Estimator */}
        <RoiEstimator 
          onOpenTrial={() => handleOpenTrial()} 
        />

        {/* Transparent Pricing Matrix */}
        <PricingSection 
          onSelectPlan={handleSelectPlan} 
        />

        {/* Direct FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Clean Editorial Footer */}
      <Footer 
        onOpenSandbox={handleOpenSandbox} 
        onOpenTrial={() => handleOpenTrial()} 
      />

      {/* Interactive In-Browser Live Sandbox Modal */}
      <LiveSandboxModal 
        isOpen={isSandboxOpen} 
        onClose={handleCloseSandbox} 
        onOpenTrial={() => {
          handleCloseSandbox();
          handleOpenTrial();
        }} 
      />

      {/* Lead Capture / 14-Day Free Access Modal */}
      <TrialModal 
        isOpen={isTrialOpen} 
        onClose={handleCloseTrial} 
        selectedPlan={selectedPlan} 
        billingCadence={billingCadence} 
      />
    </div>
  );
}
