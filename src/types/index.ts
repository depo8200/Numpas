export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD
  name: string;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  cashInBank: number;
  monthlyRevenue: number;
  monthlyBurn: number;
  growthRate: number; // percentage, e.g. 8 for 8%
}

export interface MonthProjection {
  monthIndex: number;
  label: string;
  revenue: number;
  expenses: number;
  netCashFlow: number;
  endingCash: number;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  primaryMetric: string;
  metricLabel: string;
  headline: string;
  quote: string;
  author: string;
  role: string;
  secondaryStats: {
    label: string;
    value: string;
  }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  maxRevenue: string;
  includedSeats: number;
  features: string[];
  isPopular?: boolean;
}

export interface SandboxTransaction {
  id: string;
  date: string;
  description: string;
  category: 'Revenue' | 'Payroll' | 'Software' | 'Marketing' | 'Operations';
  amount: number;
  status: 'Reconciled' | 'Pending' | 'Flagged';
}
