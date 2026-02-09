
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Menu,
  Sparkles,
  BarChart3,
  LogOut,
  Settings as SettingsIcon,
  FileText,
  User as UserIcon,
  PenTool
} from 'lucide-react';
import { Transaction, TransactionType, User, Category, Invoice, DesignBrief } from './types';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import AIInsights from './components/AIInsights';
import Reports from './components/Reports';
import Login from './components/Login';
import CategoryManagement from './components/CategoryManagement';
import InvoiceManager from './components/InvoiceManager';
import DesignBriefManager from './components/DesignBriefManager';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gr_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fintrack_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('gr_invoices');
    return saved ? JSON.parse(saved) : [];
  });

  const [briefs, setBriefs] = useState<DesignBrief[]>(() => {
    const saved = localStorage.getItem('gr_briefs');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('gr_categories');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'Omset Penjualan', type: TransactionType.INCOME },
      { id: '2', name: 'Pendapatan Lain', type: TransactionType.INCOME },
      { id: '3', name: 'Biaya Iklan', type: TransactionType.EXPENSE },
      { id: '4', name: 'Biaya Karyawan', type: TransactionType.EXPENSE },
      { id: '5', name: 'Biaya Internet', type: TransactionType.EXPENSE },
      { id: '6', name: 'Biaya Rumah Tangga', type: TransactionType.EXPENSE },
      { id: '7', name: 'Biaya Konsumsi', type: TransactionType.EXPENSE },
      { id: '8', name: 'Biaya Kontrakan', type: TransactionType.EXPENSE },
      { id: '9', name: 'Biaya Maintenance', type: TransactionType.EXPENSE }
    ];
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'insights' | 'reports' | 'settings' | 'invoices' | 'designBrief'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    localStorage.setItem('fintrack_data', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('gr_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('gr_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('gr_briefs', JSON.stringify(briefs));
  }, [briefs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gr_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gr_current_user');
    }
  }, [currentUser]);

  const handleLogout = () => {
    if (confirm('Konfirmasi: Selesaikan sesi kerja Anda?')) {
      localStorage.removeItem('gr_current_user');
      setCurrentUser(null);
      setActiveTab('dashboard');
    }
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, profit: income - expense };
  }, [transactions]);

  if (!currentUser) return <Login onLoginSuccess={setCurrentUser} />;

  return (
    <div className="flex h-screen bg-transparent text-slate-100 overflow-hidden font-['Inter'] print:bg-white print:text-black">
      {/* Sidebar Navigasi - Transparan untuk menunjukkan background global */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-black/30 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative print:hidden
      `}>
        <div className="flex flex-col h-full">
          <div className="h-24 flex items-center px-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#cc0000] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-red-900/40">
                <span className="text-white font-black italic text-base">GR</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-white font-black text-lg italic tracking-tighter leading-none">
                  GR DESAIN
                </div>
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-1 whitespace-nowrap">whatever you want</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            <div className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">OPERATIONAL</div>
            <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="DASHBOARD" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} />
            <NavItem icon={<FileText className="w-4 h-4" />} label="E-INVOICE" active={activeTab === 'invoices'} onClick={() => { setActiveTab('invoices'); setIsSidebarOpen(false); }} />
            <NavItem icon={<PenTool className="w-4 h-4" />} label="DESIGN BRIEF" active={activeTab === 'designBrief'} onClick={() => { setActiveTab('designBrief'); setIsSidebarOpen(false); }} />
            <NavItem icon={<History className="w-4 h-4" />} label="TRANSAKSI" active={activeTab === 'transactions'} onClick={() => { setActiveTab('transactions'); setIsSidebarOpen(false); }} />
            
            <div className="px-4 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-4">ANALYSIS</div>
            <NavItem icon={<BarChart3 className="w-4 h-4" />} label="REPORTING" active={activeTab === 'reports'} onClick={() => { setActiveTab('reports'); setIsSidebarOpen(false); }} />
            <NavItem icon={<Sparkles className="w-4 h-4" />} label="AI AUDITOR" active={activeTab === 'insights'} onClick={() => { setActiveTab('insights'); setIsSidebarOpen(false); }} />
            
            <div className="px-4 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-4">SYSTEM</div>
            <NavItem icon={<SettingsIcon className="w-4 h-4" />} label="CATEGORIES" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
          </nav>

          <div className="p-6 border-t border-white/5 space-y-4">
            <button 
              onClick={() => { setIsModalOpen(true); setEditingTransaction(null); }}
              className="w-full flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-[#e65100] text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded shadow-lg shadow-orange-950/20 active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ENTRY DATA</span>
            </button>
            <div className="flex items-center gap-3 px-4 py-3 border border-white/5 rounded bg-black/40 backdrop-blur-md">
              {currentUser.photo ? (
                <img src={currentUser.photo} alt="Profile" className="w-8 h-8 rounded border border-[#ff5a00] object-cover" />
              ) : (
                <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center text-xs font-bold text-white uppercase">
                  {currentUser.username.charAt(0)}
                </div>
              )}
              <div className="flex flex-col min-0">
                <span className="text-[11px] font-black text-white truncate uppercase tracking-tight">{currentUser.username}</span>
                <span className="text-[9px] text-zinc-600 font-bold uppercase">{currentUser.role}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-zinc-600 hover:text-white hover:bg-white/5 font-bold py-2 rounded transition-all text-[10px] uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative print:static print:overflow-visible bg-transparent">
        <header className="h-20 flex items-center justify-between px-10 bg-black/10 border-b border-white/5 backdrop-blur-md print:hidden z-20">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="hidden md:block text-[11px] font-black text-zinc-500 tracking-[0.3em] uppercase">
              {activeTab.replace(/([A-Z])/g, ' $1').trim()} CENTER
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 bg-black/40 border border-white/5 pl-3 pr-6 py-2 rounded-full backdrop-blur-md">
              <div className="w-8 h-8 bg-[#ff5a00] rounded-full flex items-center justify-center shadow-lg">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white tracking-widest uppercase leading-none">{currentUser.username}</span>
                <span className="text-[8px] text-[#ff5a00] font-black uppercase tracking-widest mt-1">ACTIVE SYSTEM USER</span>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 px-8 py-2.5 rounded shadow-inner backdrop-blur-md">
              <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] leading-none mb-2">Liquid Equity</p>
              <p className="text-xl font-bold heading-font tracking-tight text-[#ff5a00]">
                Rp {totals.profit.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar print:p-0 print:overflow-visible">
          <div className="max-w-7xl mx-auto h-full space-y-10">
            {activeTab === 'dashboard' && <Dashboard transactions={transactions} totals={totals} categories={categories} />}
            {activeTab === 'invoices' && <InvoiceManager invoices={invoices} setInvoices={setInvoices} />}
            {activeTab === 'designBrief' && <DesignBriefManager briefs={briefs} setBriefs={setBriefs} currentUser={currentUser} />}
            {activeTab === 'transactions' && (
              <TransactionList 
                transactions={transactions} 
                onDelete={(id) => setTransactions(transactions.filter(t => t.id !== id))} 
                onEdit={(tx) => { setEditingTransaction(tx); setIsModalOpen(true); }}
              />
            )}
            {activeTab === 'reports' && <Reports transactions={transactions} />}
            {activeTab === 'insights' && <AIInsights transactions={transactions} totals={totals} />}
            {activeTab === 'settings' && <CategoryManagement categories={categories} setCategories={setCategories} />}
          </div>
        </div>
      </main>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTransaction(null); }} 
        onSave={(txData) => {
          if (editingTransaction) {
            setTransactions(prev => prev.map(tx => tx.id === editingTransaction.id ? { ...txData, id: tx.id } : tx));
          } else {
            setTransactions(prev => [{ ...txData, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
          }
        }} 
        initialData={editingTransaction || undefined}
        categories={categories}
      />
    </div>
  );
};

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
}> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 px-5 py-4 rounded transition-all duration-200 group
      ${active ? 'bg-[#ff5a00] text-white shadow-lg shadow-orange-950/30' : 'text-zinc-500 hover:text-white hover:bg-white/5'}
    `}
  >
    <span className={`${active ? 'text-white' : 'text-zinc-700 group-hover:text-white'} transition-colors`}>{icon}</span>
    <span className={`text-[11px] font-black tracking-widest uppercase`}>{label}</span>
  </button>
);

export default App;
