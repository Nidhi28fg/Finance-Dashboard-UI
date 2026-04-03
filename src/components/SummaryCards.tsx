import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useFinance();

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
        } else {
          acc.expense += curr.amount;
        }
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Total Balance</span>
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-500">
            <Wallet size={20} />
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">{formatCurrency(balance)}</div>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-500 dark:text-emerald-400">
          <TrendingUp size={16} />
          <span>+2.5% from last month</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Total Income</span>
          <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">{formatCurrency(income)}</div>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-500 dark:text-emerald-400">
          <TrendingUp size={16} />
          <span>+12.5% from last month</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Total Expenses</span>
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-500/10 text-red-500">
            <TrendingDown size={20} />
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">{formatCurrency(expense)}</div>
        <div className="flex items-center gap-1 text-sm font-medium text-red-500 dark:text-red-400">
          <TrendingDown size={16} />
          <span>+5.2% from last month</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
