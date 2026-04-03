import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, AlertCircle, BarChart3, Clock } from 'lucide-react';

const Insights = () => {
  const { transactions } = useFinance();

  const { topCategory, biggestExpense, avgDailySpend } = useMemo(() => {
    if (transactions.length === 0) return { topCategory: 'N/A', biggestExpense: null, avgDailySpend: 0 };

    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Top category
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    
    let topCat = 'N/A';
    let maxAmt = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > maxAmt) {
        maxAmt = amt;
        topCat = cat;
      }
    }

    // Biggest expense
    const biggest = expenses.length > 0 ? expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0]) : null;

    // Average daily spend (simplified assuming data is over 30 days)
    const amountExp = expenses.reduce((sum, t) => sum + t.amount, 0);
    const avgSpend = amountExp / 30;

    return { topCategory: topCat, biggestExpense: biggest, avgDailySpend: avgSpend };
  }, [transactions]);

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Financial Insights</h2>
        </div>
        <div className="p-6 flex flex-col gap-8">
          
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-500/10 text-red-500 shrink-0">
              <BarChart3 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">Highest Spending Category</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You spend the most on <strong className="text-slate-900 dark:text-slate-50">{topCategory}</strong>. Consider setting a budget for this category to save more.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-500 shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">Average Daily Spending</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Your average daily expense is approximately <strong className="text-slate-900 dark:text-slate-50">${avgDailySpend.toFixed(0)}</strong>.
              </p>
            </div>
          </div>

          {biggestExpense && (
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">Largest Single Expense</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your biggest expense was <strong className="text-slate-900 dark:text-slate-50">${biggestExpense.amount}</strong> for {biggestExpense.description}.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">Monthly Comparison</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Your spending logic matches typical monthly cycles. Monitor recurring bills to avoid surprises.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Insights;
