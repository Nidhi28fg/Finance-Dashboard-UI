import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

const Charts = () => {
  const { transactions, theme } = useFinance();

  const { areaData, pieData } = useMemo(() => {
    // Group transactions by date (dummy grouping for this demo)
    // First, sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const balanceByDate: Record<string, number> = {};
    let currentBalance = 0;

    // For spending breakdown (pie chart)
    const expenseByCategory: Record<string, number> = {};

    sorted.forEach((tx) => {
      if (tx.type === 'income') {
        currentBalance += tx.amount;
      } else {
        currentBalance -= tx.amount;
        expenseByCategory[tx.category] = (expenseByCategory[tx.category] || 0) + tx.amount;
      }
      balanceByDate[tx.date] = currentBalance;
    });

    const area = Object.keys(balanceByDate).map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: balanceByDate[date],
    }));

    const pie = Object.keys(expenseByCategory).map(category => ({
      name: category,
      value: expenseByCategory[category]
    })).sort((a, b) => b.value - a.value);

    return { areaData: area, pieData: pie };
  }, [transactions]);

  const textColor = theme === 'dark' ? '#ffffffff' : '#000000ff';

  const gridColor = theme === 'dark' ? '#334155' : '#ffffffff';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-50">Balance History</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="date" stroke={textColor} tick={{ fill: textColor }} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} tick={{ fill: textColor }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: gridColor,
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-50">Spending by Category</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: gridColor,
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: any) => `$${value}`}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ color: textColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
