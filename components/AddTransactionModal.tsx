
import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { TransactionType, Transaction, Category } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction;
  categories: Category[];
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave, initialData, categories }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const filteredCategories = categories.filter(c => c.type === type);

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setCategory(initialData.category);
      setAmount(initialData.amount.toString());
      setNote(initialData.note);
      setDate(new Date(initialData.date).toISOString().split('T')[0]);
    } else {
      setType(TransactionType.EXPENSE);
      setCategory(categories.find(c => c.type === TransactionType.EXPENSE)?.name || '');
      setAmount('');
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [initialData, isOpen, categories]);

  useEffect(() => {
    const isAvailable = filteredCategories.some(c => c.name === category);
    if (!isAvailable && filteredCategories.length > 0) {
      setCategory(filteredCategories[0].name);
    }
  }, [type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    onSave({
      type,
      category: category,
      amount: Number(amount),
      note,
      date: new Date(date).toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-[#0a0a0a] border border-[#1a1a1a] rounded-none overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 professional-card">
        <div className="flex items-center justify-between p-8 border-b border-[#1a1a1a] bg-black/50">
          <div className="flex flex-col">
            <h3 className="text-xl font-black heading-font text-white uppercase tracking-tight italic">
              {initialData ? 'MODIFIKASI TRANSAKSI' : 'REGISTRASI TRANSAKSI'}
            </h3>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Sistem Input Finansial Terintegrasi</span>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-[#1a1a1a] rounded-none transition-all text-zinc-700 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="flex p-1 bg-black border border-[#1a1a1a] rounded-none">
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${type === TransactionType.INCOME ? 'bg-[#ff5a00] text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
            >
              Inflow / Omset
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${type === TransactionType.EXPENSE ? 'bg-[#ff5a00] text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-300'}`}
            >
              Outflow / Biaya
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Tanggal Efektif</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-5 py-4 text-sm font-black bg-black border-[#1a1a1a] text-white focus:border-[#ff5a00] outline-none tracking-tight"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nominal (IDR)</label>
              <input
                type="number"
                required
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-5 py-4 text-sm font-black bg-black border-[#1a1a1a] text-white focus:border-[#ff5a00] outline-none tracking-tight"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Klasifikasi Akun</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-4 text-sm font-black cursor-pointer appearance-none bg-black border-[#1a1a1a] text-white focus:border-[#ff5a00] outline-none tracking-tight uppercase"
            >
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.name} className="bg-black">{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Catatan Operasional</label>
            <textarea
              placeholder="Berikan keterangan singkat untuk audit..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-5 py-4 text-sm font-bold h-28 resize-none bg-black border-[#1a1a1a] text-white focus:border-[#ff5a00] outline-none tracking-tight uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff5a00] hover:bg-[#e65100] text-white font-black uppercase tracking-widest py-5 rounded-none transition-all flex items-center justify-center space-x-3 active:scale-[0.98] shadow-xl shadow-orange-950/20 text-[11px]"
          >
            <Check className="w-5 h-5" />
            <span>Simpan Entri Data</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
