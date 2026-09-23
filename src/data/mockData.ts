import { CaseStudy, CurrencyConfig, PricingPlan, ScenarioPreset, SandboxTransaction } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5, name: 'Japanese Yen' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36, name: 'Canadian Dollar' },
};

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'studio',
    name: 'Design & Engineering Studio',
    description: '12-person agency with retainer and milestone billings',
    cashInBank: 240000,
    monthlyRevenue: 68000,
    monthlyBurn: 54000,
    growthRate: 4,
  },
  {
    id: 'saas_seed',
    name: 'Seed SaaS Platform',
    description: 'Post-seed startup with 8 engineers focusing on product-market fit',
    cashInBank: 850000,
    monthlyRevenue: 28000,
    monthlyBurn: 72000,
    growthRate: 14,
  },
  {
    id: 'solo_creator',
    name: 'Solo Operator / Consultant',
    description: 'High-margin independent specialist with minimal fixed overhead',
    cashInBank: 85000,
    monthlyRevenue: 22000,
    monthlyBurn: 7500,
    growthRate: 3,
  },
  {
    id: 'growth_brand',
    name: 'Direct-to-Consumer Brand',
    description: 'Scaling physical goods brand with inventory cycles and ad spend',
    cashInBank: 420000,
    monthlyRevenue: 145000,
    monthlyBurn: 132000,
    growthRate: 9,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'koto',
    client: 'Studio Koto & Co.',
    industry: 'Architecture & Brand Studio',
    location: 'London / New York',
    primaryMetric: '28 min',
    metricLabel: 'Monthly book close time (down from 9 days)',
    headline: 'Eliminated 4 disconnected spreadsheets and recovered £42,000 in unbilled retainer overruns',
    quote: 'Before Numpa, our partners were arguing every Friday over cash runway estimates. Now our billings, payroll, and 18-month burn live in one single source of truth.',
    author: 'Elena Rostova',
    role: 'Managing Partner & COO',
    secondaryStats: [
      { label: 'Unbilled billings recovered', value: '£42,000' },
      { label: 'Forecast accuracy variance', value: '±1.8%' },
      { label: 'Hours saved per cycle', value: '34 hrs' },
    ],
  },
  {
    id: 'forma',
    client: 'Forma Biotech',
    industry: 'Pre-clinical Research',
    location: 'Cambridge, MA',
    primaryMetric: '19.4 mo',
    metricLabel: 'Continuous rolling runway visibility',
    headline: 'Scaled from 6 to 34 lab researchers without hiring an outsourced accounting team',
    quote: 'In biotech, running out of runway without notice is fatal. Numpa lets us stress-test clinical trial delays and reagent costs dynamically in seconds.',
    author: 'Marcus Vance, PhD',
    role: 'Co-Founder & Chief Scientist',
    secondaryStats: [
      { label: 'Grant compliance audits passed', value: '100%' },
      { label: 'R&D tax credits captured', value: '$118,000' },
      { label: 'External CPA costs reduced', value: '-65%' },
    ],
  },
  {
    id: 'veloce',
    client: 'Veloce Data Systems',
    industry: 'B2B Infrastructure SaaS',
    location: 'San Francisco, CA',
    primaryMetric: '99.4%',
    metricLabel: 'Automated invoice collection rate within 14 days',
    headline: 'Multi-currency invoicing across 14 countries with automated cash ledger reconciliation',
    quote: 'Numpa replaced our bloated QuickBooks and three separate Stripe add-ons. It is mathematically precise and built for people who value speed.',
    author: 'Siddharth Nair',
    role: 'VP of Finance & Operations',
    secondaryStats: [
      { label: 'DSO (Days Sales Outstanding)', value: '14 days' },
      { label: 'Currency exchange spread saved', value: '$19,400' },
      { label: 'Active billing regions', value: '14 countries' },
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Studio Core',
    subtitle: 'For independent operators and boutique studios under $500k annual revenue.',
    monthlyPrice: 39,
    annualMonthlyPrice: 29,
    maxRevenue: 'Up to $500k annual volume',
    includedSeats: 2,
    features: [
      'Real-time cash ledger & daily bank sync',
      '12-month rolling runway projections',
      'Automated invoice generation & payment links',
      'Multi-currency support (USD, EUR, GBP)',
      'Exportable CSV & GAAP tax summaries',
      'Standard email support within 24h',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Engine',
    subtitle: 'For scaling agencies, venture-backed startups, and multi-entity teams.',
    monthlyPrice: 99,
    annualMonthlyPrice: 79,
    maxRevenue: 'Up to $5M annual volume',
    includedSeats: 6,
    isPopular: true,
    features: [
      'Everything in Studio Core, plus:',
      'Multi-scenario stress testing (Hiring & Downturns)',
      'Automated accounts receivable recovery & aging alerts',
      'Unit economics engine (LTV, CAC, payback dials)',
      'Stripe, Gusto, and Wise bi-directional integrations',
      'Dedicated accountant & bookkeeper portal access',
      'Priority live chat support under 15 minutes',
    ],
  },
  {
    id: 'scale',
    name: 'Institutional Scale',
    subtitle: 'For enterprise operations, holding companies, and established multi-brand groups.',
    monthlyPrice: 249,
    annualMonthlyPrice: 199,
    maxRevenue: 'Unlimited annual volume',
    includedSeats: 20,
    features: [
      'Everything in Growth Engine, plus:',
      'Consolidated multi-entity rollups & parent ledgers',
      'Custom ERP & NetSuite sync endpoints',
      'SOC2 Type II compliance audit packet & bespoke DPA',
      'Dedicated fractional CFO quarterly architecture review',
      'Custom API rate limits & webhooks',
      '99.95% uptime SLA guarantee',
    ],
  },
];

export const INITIAL_SANDBOX_TRANSACTIONS: SandboxTransaction[] = [
  {
    id: 'tx-101',
    date: 'Today, 09:14',
    description: 'Acme Global — Enterprise Q3 Retainer',
    category: 'Revenue',
    amount: 14500,
    status: 'Reconciled',
  },
  {
    id: 'tx-102',
    date: 'Yesterday',
    description: 'Gusto Payroll — Bi-weekly Engineering & Design',
    category: 'Payroll',
    amount: -18200,
    status: 'Reconciled',
  },
  {
    id: 'tx-103',
    date: 'Sep 21',
    description: 'Amazon Web Services — Production Compute Cluster',
    category: 'Software',
    amount: -1420,
    status: 'Reconciled',
  },
  {
    id: 'tx-104',
    date: 'Sep 20',
    description: 'Metropolis Design Co. — Milestone Delivery #2',
    category: 'Revenue',
    amount: 8750,
    status: 'Pending',
  },
  {
    id: 'tx-105',
    date: 'Sep 19',
    description: 'Google Ads & LinkedIn Sponsored Growth',
    category: 'Marketing',
    amount: -2850,
    status: 'Reconciled',
  },
  {
    id: 'tx-106',
    date: 'Sep 18',
    description: 'Studio Workspace Lease & Fiber Connectivity',
    category: 'Operations',
    amount: -3400,
    status: 'Reconciled',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How is Numpa different from QuickBooks or Xero?',
    answer: 'Traditional accounting tools are built for historical tax compliance — recording what happened months ago in dense double-entry ledgers. Numpa is built for forward-looking operational decisions: live rolling runway, interactive hiring stress-tests, automated receivables recovery, and immediate unit-economic metrics without spreadsheet formulas.',
  },
  {
    question: 'Does Numpa replace my CPA or existing bookkeeper?',
    answer: 'No, it gives them superpowers. You can grant your CPA or bookkeeper free read-only or accountant-level access. Numpa automatically exports standardized GAAP-compliant general ledger journals and tax packages at the end of each fiscal period.',
  },
  {
    question: 'How do you handle multi-currency conversions and FX fluctuation?',
    answer: 'Numpa syncs daily European Central Bank and Federal Reserve mid-market exchange rates. All foreign currency transactions (EUR, GBP, JPY, CAD) calculate realized and unrealized FX gains or losses automatically, removing manual spreadsheet currency conversions.',
  },
  {
    question: 'What bank and payment integrations are supported out of the box?',
    answer: 'Numpa connects directly to over 12,000 North American and European financial institutions via encrypted, read-only open banking APIs (Plaid, Stripe, Gusto, Brex, Mercury, Ramp, Wise, and Silicon Valley Bank).',
  },
  {
    question: 'Can I export all our company data at any point?',
    answer: 'Yes. You maintain complete ownership of your ledger. With one click you can export raw transaction CSVs, balance sheet snapshots, P&L schedules, and scenario forecast models.',
  },
];
