import React from 'react';
import { LayoutDashboard, Receipt, LineChart, Wallet } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'transactions' | 'insights') => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="w-full md:w-[260px] bg-white dark:bg-slate-800 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col md:sticky md:top-0 md:h-screen transition-colors duration-300">
      <div className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-10">
        <Wallet className="text-indigo-600 dark:text-indigo-500" size={28} />
        <span>FinDash</span>
      </div>
      
      <nav className="flex md:flex-col flex-row gap-2 overflow-x-auto pb-2 md:pb-0">
        <button 
          className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-500'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        
        <button 
          className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'transactions' ? 'bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-500'}`}
          onClick={() => setActiveTab('transactions')}
        >
          <Receipt size={20} />
          <span>Transactions</span>
        </button>

        <button 
          className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'insights' ? 'bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-500'}`}
          onClick={() => setActiveTab('insights')}
        >
          <LineChart size={20} />
          <span>Insights</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
