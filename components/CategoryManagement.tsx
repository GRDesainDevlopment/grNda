
import React, { useState } from 'react';
import { Plus, Trash2, Tag, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Category, TransactionType } from '../types';

interface CategoryManagementProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, setCategories }) => {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<TransactionType>(TransactionType.EXPENSE);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const isDuplicate = categories.some(
      cat => cat.name.toLowerCase() === newName.toLowerCase() && cat.type === newType
    );

    if (isDuplicate) {
      alert('Kategori sudah ada!');
      return;
    }

    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      type: newType
    };

    setCategories([...categories, newCat]);
    setNewName('');
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Hapus kategori ini? Data transaksi yang sudah ada mungkin akan kehilangan referensi kategori.')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Container Input Utama - Tema Hitam Transparan */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-none shadow-2xl professional-card">
        <div className="flex items-center space-x-5 mb-10">
          <div className="p-4 bg-[#ff5a00] rounded-none shadow-lg shadow-orange-950/20">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter heading-font">KLASIFIKASI AKUN</h2>
            <p className="text-[10px] text-[#ff5a00] font-black uppercase tracking-[0.3em] mt-1">KONFIGURASI PARAMETER KEUANGAN</p>
          </div>
        </div>

        <form onSubmit={handleAddCategory} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">LABEL KATEGORI</label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-black/50 border border-white/10 px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#ff5a00] transition-all uppercase tracking-tight"
              placeholder="Ex: Royalti, Maintenance, dsb."
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">TIPE ENTRI</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as TransactionType)}
              className="w-full bg-black/50 border border-white/10 px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#ff5a00] transition-all appearance-none cursor-pointer uppercase tracking-tight"
            >
              <option value={TransactionType.INCOME}>Operational / Pemasukan</option>
              <option value={TransactionType.EXPENSE}>Operational / Pengeluaran</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#ff5a00] hover:bg-[#e65100] text-white font-black uppercase tracking-widest py-4 rounded-none shadow-xl shadow-orange-950/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <Plus className="w-5 h-5" />
              <span>DAFTARKAN KATEGORI</span>
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CategoryList 
          title="CLASSIFICATION: INCOME" 
          items={categories.filter(c => c.type === TransactionType.INCOME)} 
          onDelete={handleDeleteCategory}
          icon={<ArrowUpRight className="text-emerald-500" />}
        />
        <CategoryList 
          title="CLASSIFICATION: EXPENSE" 
          items={categories.filter(c => c.type === TransactionType.EXPENSE)} 
          onDelete={handleDeleteCategory}
          icon={<ArrowDownLeft className="text-[#ff5a00]" />}
        />
      </div>
    </div>
  );
};

const CategoryList = ({ title, items, onDelete, icon }: any) => (
  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-none overflow-hidden shadow-2xl professional-card">
    <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black/20">
      <h3 className="text-[11px] font-black text-white italic uppercase tracking-widest heading-font">{title}</h3>
      <span className="text-[9px] bg-[#ff5a00]/10 text-[#ff5a00] border border-[#ff5a00]/20 px-4 py-1.5 rounded-none font-black tracking-widest uppercase">{items.length} PARAMETER</span>
    </div>
    <div className="divide-y divide-white/10">
      {items.length === 0 ? (
        <div className="p-16 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] italic">Database Kategori Kosong</div>
      ) : (
        items.map((item: Category) => (
          <div key={item.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
            <div className="flex items-center space-x-5">
              <div className="p-3 bg-black/50 border border-white/10 rounded-none group-hover:border-[#ff5a00]/30 transition-all shadow-inner">{icon}</div>
              <span className="text-sm font-black text-zinc-300 uppercase tracking-tighter">{item.name}</span>
            </div>
            <button 
              onClick={() => onDelete(item.id)}
              className="p-3 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-none transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default CategoryManagement;
