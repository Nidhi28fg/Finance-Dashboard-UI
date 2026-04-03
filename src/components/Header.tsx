import React from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Header = () => {
  const { role, setRole, theme, toggleTheme } = useFinance();

  return (
    <header className="h-[72px] px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 sticky top-0 z-10 transition-colors duration-300">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Welcome back!</h2>
      </div>
      <div className="flex items-center gap-4">
        <select
          className="appearance-none bg-white border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 py-2 pr-8 pl-4 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'%3E%3Cpolyline points=\\'6 9 12 15 18 9\\'/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] transition-colors"
          value={role}
          onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
        >
          <option value="viewer" className='text-white dark:text-white bg-green-500'>Viewer Mode</option>
          <option value="admin" className='text-white dark:text-white bg-red-500'>Admin Mode</option>
        </select>

        <button
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 rounded-full transition-colors"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 rounded-full transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
