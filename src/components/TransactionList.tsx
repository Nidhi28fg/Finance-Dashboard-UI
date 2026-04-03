import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Plus, Search, Filter, Trash2 } from 'lucide-react';
import { TransactionType, CATEGORIES } from '../data/mockData';

const TransactionList = () => {
  const { transactions, role, addTransaction, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New transaction form state
  const [newTxDate, setNewTxDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxCategory, setNewTxCategory] = useState(CATEGORIES[8]); // Default 'Other'
  const [newTxType, setNewTxType] = useState<TransactionType>('expense');
  const [newTxDesc, setNewTxDesc] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxAmount || !newTxDesc || !newTxDate) return;

    addTransaction({
      date: newTxDate,
      amount: parseFloat(newTxAmount),
      category: newTxCategory,
      type: newTxType,
      description: newTxDesc
    });

    setIsModalOpen(false);
    setNewTxAmount('');
    setNewTxDesc('');
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Recent Transactions</h2>
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input 
                type="text" 
                className="w-full md:w-[200px] pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <select 
              className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 py-2 pl-4 pr-8 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'%3E%3Cpolyline points=\\'6 9 12 15 18 9\\'/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] transition-colors"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {role === 'admin' && (
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-all hover:-translate-y-px" 
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={16} /> Add New
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">Description</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">Category</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">Type</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">Amount</th>
                {role === 'admin' && <th className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-50">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-50">{tx.description}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-50">{tx.category}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-slate-50'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4">
                        <button 
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors" 
                          onClick={() => deleteTransaction(tx.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'admin' ? 6 : 5} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Add Transaction</h3>
              <button 
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors" 
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddTransaction}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Type</label>
                  <select 
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                    value={newTxType} 
                    onChange={(e) => setNewTxType(e.target.value as any)}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" 
                    required 
                    value={newTxDesc} 
                    onChange={(e) => setNewTxDesc(e.target.value)} 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Amount</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" 
                    required min="0.01" step="0.01" 
                    value={newTxAmount} 
                    onChange={(e) => setNewTxAmount(e.target.value)} 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" 
                    required 
                    value={newTxDate} 
                    onChange={(e) => setNewTxDate(e.target.value)} 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Category</label>
                  <select 
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" 
                    value={newTxCategory} 
                    onChange={(e) => setNewTxCategory(e.target.value)}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 rounded-b-xl bg-slate-50 dark:bg-slate-800/50">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-50 rounded-md text-sm font-medium transition-colors" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
