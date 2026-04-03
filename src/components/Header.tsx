import React, { useState, useRef } from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Header = () => {
  const { role, setRole, theme, toggleTheme } = useFinance();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 sticky top-0 z-10 transition-colors duration-300">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Welcome back!</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-[140px] bg-white border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-black py-2 px-4 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          >
            <span>{role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg overflow-hidden z-20 py-1">
              <button
                type="button"
                onClick={() => { setRole('viewer'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${role === 'viewer' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-300'} hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white`}
              >
                Viewer Mode
              </button>
              <button
                type="button"
                onClick={() => { setRole('admin'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${role === 'admin' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-300'} hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white`}
              >
                Admin Mode
              </button>
            </div>
          )}
        </div>

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
