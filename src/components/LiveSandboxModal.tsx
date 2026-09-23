import React, { useState, useMemo } from 'react';
import { X, Plus, CheckCircle, RefreshCw, Filter, ArrowUpRight, DollarSign, Download } from 'lucide-react';
import { INITIAL_SANDBOX_TRANSACTIONS } from '../data/mockData';
import { SandboxTransaction } from '../types';

interface LiveSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrial: () => void;
}

export const LiveSandboxModal: React.FC<LiveSandboxModalProps> = ({ isOpen, onClose, onOpenTrial }) => {
  const [transactions, setTransactions] = useState<SandboxTransaction[]>(INITIAL_SANDBOX_TRANSACTIONS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Add Transaction Form
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<SandboxTransaction['category']>('Revenue');

  if (!isOpen) return null;

  // Filtered transactions
  const filtered = activeCategory === 'All'
    ? transactions
    : transactions.filter((t) => t.category === activeCategory);

  // Financial aggregates
  const totalRevenue = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, curr) => acc + curr.amount, 0)
  );

  const netCashFlow = totalRevenue - totalExpenses;
  const simulatedBankBalance = 345000 + netCashFlow;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim() || !amount) return;

    const numAmount = category === 'Revenue' ? Math.abs(Number(amount)) : -Math.abs(Number(amount));

    const newTx: SandboxTransaction = {
      id: `tx-${Date.now()}`,
      date: 'Just now',
      description: desc.trim(),
      category,
      amount: numAmount,
      status: 'Reconciled',
    };

    setTransactions([newTx, ...transactions]);
    setDesc('');
    setAmount('');
    setShowAddForm(false);
  };

  const handleToggleReconcile = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Reconciled' ? 'Pending' : 'Reconciled' }
          : t
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-xl border border-stone-300 shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-stone-900 font-display">
              Numpa Interactive Sandbox
            </span>
            <span className="text-[11px] font-mono bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
              Live Ephemeral Session
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTrial}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Summary Bar */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-stone-500 font-medium">Reconciled Cash Balance</div>
            <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">
              ${simulatedBankBalance.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-stone-500 font-medium">Monthly Inflows</div>
            <div className="text-lg font-bold font-mono text-emerald-700 tabular-nums">
              +${totalRevenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-stone-500 font-medium">Monthly Outflows</div>
            <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">
              -${totalExpenses.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-stone-500 font-medium">Net Operational Run</div>
            <div className={`text-lg font-bold font-mono tabular-nums ${
              netCashFlow >= 0 ? 'text-emerald-700' : 'text-stone-900'
            }`}>
              {netCashFlow >= 0 ? '+' : ''}${netCashFlow.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="px-6 py-3 bg-stone-50/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {['All', 'Revenue', 'Payroll', 'Software', 'Marketing', 'Operations'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Add Transaction Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Cancel Entry' : 'Simulate New Transaction'}</span>
          </button>
        </div>

        {/* New Transaction Form Drawer */}
        {showAddForm && (
          <form onSubmit={handleAddTransaction} className="p-4 bg-stone-100 border-b border-stone-200 space-y-3">
            <div className="text-xs font-semibold text-stone-800">
              Simulate Live Inflow or Outflow
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Description (e.g. Stripe Payout, Server Bill)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                className="col-span-2 px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              <input
                type="number"
                placeholder="Amount (USD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                className="px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              >
                <option value="Revenue">Revenue (Inflow)</option>
                <option value="Payroll">Payroll</option>
                <option value="Software">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded"
              >
                Post to Sandbox Ledger
              </button>
            </div>
          </form>
        )}

        {/* Transactions Table */}
        <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 text-xs">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="px-6 py-3 flex items-center justify-between hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  item.status === 'Reconciled' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></span>
                <div>
                  <div className="font-semibold text-stone-900">{item.description}</div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {item.date} · {item.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`font-mono font-bold tabular-nums text-sm ${
                  item.amount > 0 ? 'text-emerald-700' : 'text-stone-900'
                }`}>
                  {item.amount > 0 ? '+' : ''}${item.amount.toLocaleString()}
                </span>

                <button
                  onClick={() => handleToggleReconcile(item.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    item.status === 'Reconciled'
                      ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                  title="Click to toggle reconciliation state"
                >
                  {item.status}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>Testing in sandbox environment · Changes reset on page refresh</span>
          <button
            onClick={onOpenTrial}
            className="font-semibold text-stone-900 hover:text-stone-700 flex items-center gap-1"
          >
            <span>Connect real accounts via Plaid & Stripe</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
