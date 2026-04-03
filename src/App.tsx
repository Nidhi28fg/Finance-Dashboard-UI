import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'insights'>('dashboard');

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col min-w-0 w-full">
        <Header />
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'insights' && <Insights />}
      </main>
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}

export default App;
