
import React, { useState, useMemo } from 'react';
import { Calendar, Filter, FileText, Download, ArrowUp, ArrowDown } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ReportsProps {
  transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
  const [reportType, setReportType] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(transactions.map(t => new Date(t.date).getFullYear())));
    if (uniqueYears.length === 0) return [new Date().getFullYear()];
    return uniqueYears.sort((a, b) => b - a);
  }, [transactions]);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const reportData = useMemo(() => {
    if (reportType === 'yearly') {
      return months.map((month, index) => {
        const monthIncome = transactions
          .filter(t => new Date(t.date).getFullYear() === selectedYear && new Date(t.date).getMonth() === index && t.type === TransactionType.INCOME)
          .reduce((sum, t) => sum + t.amount, 0);
        const monthExpense = transactions
          .filter(t => new Date(t.date).getFullYear() === selectedYear && new Date(t.date).getMonth() === index && t.type === TransactionType.EXPENSE)
          .reduce((sum, t) => sum + t.amount, 0);
        return { name: month, omset: monthIncome, pengeluaran: monthExpense };
      });
    } else {
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      const dailyData = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const dayIncome = transactions
          .filter(t => {
            const date = new Date(t.date);
            return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === i && t.type === TransactionType.INCOME;
          })
          .reduce((sum, t) => sum + t.amount, 0);
        const dayExpense = transactions
          .filter(t => {
            const date = new Date(t.date);
            return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === i && t.type === TransactionType.EXPENSE;
          })
          .reduce((sum, t) => sum + t.amount, 0);
        dailyData.push({ name: `${i}`, omset: dayIncome, pengeluaran: dayExpense });
      }
      return dailyData;
    }
  }, [reportType, selectedYear, selectedMonth, transactions]);

  const summary = useMemo(() => {
    const totalOmset = reportData.reduce((sum, d) => sum + d.omset, 0);
    const totalPengeluaran = reportData.reduce((sum, d) => sum + d.pengeluaran, 0);
    return { omset: totalOmset, pengeluaran: totalPengeluaran, profit: totalOmset - totalPengeluaran };
  }, [reportData]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none shadow-xl professional-card">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#ff5a00] rounded-none shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Report Analytics</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Enterprise Intelligence Center</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value as 'monthly' | 'yearly')}
            className="bg-black/50 border border-white/10 text-white text-[10px] font-black uppercase px-4 py-3 rounded-none focus:ring-1 focus:ring-[#ff5a00] outline-none cursor-pointer"
          >
            <option value="monthly">Monthly Audit</option>
            <option value="yearly">Yearly Audit</option>
          </select>

          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-black/50 border border-white/10 text-white text-[10px] font-black uppercase px-4 py-3 rounded-none focus:ring-1 focus:ring-[#ff5a00] outline-none cursor-pointer"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          {reportType === 'monthly' && (
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="bg-black/50 border border-white/10 text-white text-[10px] font-black uppercase px-4 py-3 rounded-none focus:ring-1 focus:ring-[#ff5a00] outline-none cursor-pointer"
            >
              {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
          )}

          <button className="p-3 bg-[#ff5a00]/10 border border-[#ff5a00]/20 rounded-none text-[#ff5a00] hover:bg-[#ff5a00]/20 transition-all" title="Export Audit">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SummaryCard label="Revenue Gross" value={summary.omset} icon={<ArrowUp className="w-4 h-4" />} type="pos" />
        <SummaryCard label="Operational Burn" value={summary.pengeluaran} icon={<ArrowDown className="w-4 h-4" />} type="neg" />
        <SummaryCard label="Net Liquidity" value={summary.profit} icon={<FileText className="w-4 h-4" />} type="neutral" highlight />
      </div>

      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-none p-12 shadow-2xl professional-card">
        <h3 className="text-sm font-black text-white italic uppercase tracking-[0.2em] mb-12 text-center">PERFORMANCE MATRIX</h3>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip 
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #ff5a00', borderRadius: '4px', backdropFilter: 'blur(4px)' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <Bar dataKey="omset" fill="#ff5a00" radius={[2, 2, 0, 0]} name="Income" />
              <Bar dataKey="pengeluaran" fill="#27272a" radius={[2, 2, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, icon, type, highlight }: any) => (
  <div className={`p-8 rounded-none border-l-4 transition-all duration-300 ${highlight ? 'bg-[#ff5a00]/90 border-[#e65100] shadow-2xl shadow-orange-950/40' : 'bg-black/40 border-white/10 hover:bg-black/60'}`}>
    <div className="flex items-center justify-between mb-6">
      <span className={`text-[10px] font-black tracking-widest uppercase ${highlight ? 'text-white' : 'text-zinc-500'}`}>{label}</span>
      <div className={`p-2 rounded-none ${highlight ? 'bg-black/20' : 'bg-[#ff5a00]/10 text-[#ff5a00]'}`}>
        {icon}
      </div>
    </div>
    <p className={`text-2xl font-black heading-font tracking-tighter ${highlight ? 'text-white' : (type === 'pos' ? 'text-emerald-500' : (type === 'neg' ? 'text-[#ff5a00]' : 'text-white'))}`}>
      Rp {value.toLocaleString('id-ID')}
    </p>
  </div>
);

export default Reports;
