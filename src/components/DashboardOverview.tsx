import React from 'react';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
import { useFinance } from '../context/FinanceContext';

const DashboardOverview = () => {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1">Dashboard Overview</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Here's your financial summary at a glance.</p>
      </div>
      <SummaryCards />
      <Charts />
    </div>
  );
};

export default DashboardOverview;
