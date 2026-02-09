
import React from 'react';
import { Trash2, Pencil, ArrowUpRight, ArrowDownLeft, Tag, Search } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (tx: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-none overflow-hidden professional-card animate-in fade-in duration-500">
      <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-black/50 border border-white/10 rounded-none flex items-center justify-center text-[#ff5a00] shadow-inner"><Search className="w-5 h-5" /></div>
           <div>
             <h3 className="text-xs font-black text-white heading-font uppercase tracking-widest">Ledger Transaksi</h3>
             <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Sistem Audit Finansial</p>
           </div>
        </div>
        <span className="text-[10px] text-[#ff5a00] bg-[#ff5a00]/10 border border-[#ff5a00]/20 px-4 py-1.5 rounded-none font-black uppercase tracking-widest">
          {transactions.length} Total Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/40 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/5">
              <th className="px-8 py-5">Date / Time</th>
              <th className="px-8 py-5">Classification</th>
              <th className="px-8 py-5">Audit Note</th>
              <th className="px-8 py-5 text-right">Magnitude (IDR)</th>
              <th className="px-8 py-5 text-center">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.length === 0 ? (
              <tr><td colSpan={5} className="px-8 py-24 text-center text-zinc-600 text-[10px] font-black uppercase tracking-widest italic">Belum ada entri data dalam database.</td></tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-none flex items-center justify-center border shadow-sm backdrop-blur-sm ${tx.type === TransactionType.INCOME ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-[#ff5a00]/10 text-[#ff5a00] border-[#ff5a00]/20'}`}>
                        {tx.type === TransactionType.INCOME ? <ArrowUpRight className="w-4.5 h-4.5" /> : <ArrowDownLeft className="w-4.5 h-4.5" />}
                      </div>
                      <div className="flex flex-col min-w-[120px]">
                        <span className="text-xs font-black text-white uppercase tracking-tighter">{new Date(tx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{new Date(tx.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[9px] font-black px-3 py-1.5 rounded-none bg-black/40 text-zinc-300 border border-white/10 inline-flex items-center uppercase tracking-widest group-hover:border-[#ff5a00]/30 transition-colors">
                      <Tag className="w-3.5 h-3.5 mr-2 text-[#ff5a00]" />
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[11px] text-zinc-400 max-w-[280px] truncate font-bold uppercase">
                    {tx.note || <span className="text-zinc-700 italic">No notes</span>}
                  </td>
                  <td className={`px-8 py-6 text-right text-base font-black heading-font tracking-tighter ${tx.type === TransactionType.INCOME ? 'text-emerald-500' : 'text-[#ff5a00]'}`}>
                    {tx.type === TransactionType.INCOME ? '+' : '-'} {tx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(tx)} className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-none transition-all"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => onDelete(tx.id)} className="p-2 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-none transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
