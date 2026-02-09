
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';
import { Wallet, ArrowUpRight, ArrowDownLeft, Activity, Layers } from 'lucide-react';
import { Transaction, TransactionType, Category } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  totals: { income: number; expense: number; profit: number; };
  categories: Category[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, totals, categories }) => {
  const expenseCategories = categories.filter(c => c.type === TransactionType.EXPENSE).map(c => c.name);
  const expenseByCategory = expenseCategories.map(catName => {
    const value = transactions.filter(t => t.type === TransactionType.EXPENSE && t.category === catName).reduce((sum, t) => sum + t.amount, 0);
    return { name: catName, value };
  }).filter(item => item.value > 0);

  const lastEntries = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-10).map(t => ({
      name: new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      amount: t.type === TransactionType.INCOME ? t.amount : -t.amount
    }));

  const COLORS = ['#ff5a00', '#fb923c', '#fdba74', '#3f3f46', '#71717a', '#a1a1aa', '#1a1a1a'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard label="REVENUE OMSET" value={totals.income} icon={<ArrowUpRight />} type="positive" />
        <MetricCard label="OPERATIONAL BURN" value={totals.expense} icon={<ArrowDownLeft />} type="negative" />
        <MetricCard label="LIQUID ASSETS" value={totals.profit} icon={<Wallet />} type="neutral" highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ChartCard title="GR FINANCE" icon={<Layers className="w-4 h-4" />}>
          {expenseByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none">
                  {expenseByCategory.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '4px', backdropFilter: 'blur(4px)' }} 
                    itemStyle={{ color: '#fff', fontSize: '12px' }} 
                    formatter={(v: any) => `Rp ${v.toLocaleString('id-ID')}`} 
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', color: '#a1a1aa', paddingTop: '20px', fontWeight: 'bold', textTransform: 'uppercase' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <EmptyState message="Menunggu entri biaya..." />}
        </ChartCard>

        <ChartCard title="TREND ARUS KAS" icon={<Activity className="w-4 h-4" />}>
          {lastEntries.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lastEntries}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5a00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff5a00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.5} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `Rp${v/1000}k`} fontWeight="bold" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '4px', backdropFilter: 'blur(4px)' }} 
                  itemStyle={{ fontSize: '12px' }}
                  formatter={(v: any) => `Rp ${v.toLocaleString('id-ID')}`} 
                />
                <Area type="monotone" dataKey="amount" stroke="#ff5a00" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <EmptyState message="Data tren tidak tersedia..." />}
        </ChartCard>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, type, highlight }: any) => (
  <div className={`p-10 transition-all professional-card border-2 ${highlight ? 'bg-[#ff5a00]/90 border-[#ff5a00] rounded-[3rem] shadow-[0_0_40px_rgba(255,90,0,0.3)]' : 'bg-black/40 border-white/10 rounded-[3rem] hover:bg-black/60'}`}>
    <div className="flex items-center justify-between mb-4">
      <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${highlight ? 'text-white' : 'text-zinc-500'}`}>{label}</span>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-black/20 text-white' : 'bg-black/50 text-[#ff5a00] border border-white/5'}`}>
        {React.cloneElement(icon, { className: 'w-5 h-5' })}
      </div>
    </div>
    <div className="flex flex-col">
        <span className="text-3xl font-black heading-font text-white tracking-tighter">Rp {value.toLocaleString('id-ID')}</span>
        {!highlight && (
            <div className="mt-4 flex">
              <span className="text-[9px] font-black px-3 py-1 bg-[#ff5a00] text-white tracking-[0.2em] uppercase shadow-lg shadow-orange-900/20">
                  {type === 'positive' ? 'INCOMING' : 'EXPENDITURE'}
              </span>
            </div>
        )}
    </div>
  </div>
);

const ChartCard = ({ title, icon, children }: any) => (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 professional-card">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-10 bg-black/50 border border-white/10 flex items-center justify-center text-[#ff5a00] rounded-xl">{icon}</div>
        <h3 className="text-[11px] font-black text-white heading-font tracking-[0.3em] uppercase">{title}</h3>
      </div>
      <div className="h-80">
        {children}
      </div>
    </div>
);

const EmptyState = ({ message }: any) => (
  <div className="h-full flex flex-col items-center justify-center text-zinc-600 italic text-xs text-center px-10 uppercase font-bold tracking-widest">{message}</div>
);

export default Dashboard;
