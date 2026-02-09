
import React, { useState } from 'react';
import { Plus, PenTool, Trash2, Printer, X, Eye, Edit } from 'lucide-react';
import { DesignBrief, User } from '../types';
import DesignBriefForm from './DesignBriefForm';
import DesignBriefTemplate from './DesignBriefTemplate';

interface DesignBriefManagerProps {
  briefs: DesignBrief[];
  setBriefs: React.Dispatch<React.SetStateAction<DesignBrief[]>>;
  currentUser: User;
}

const DesignBriefManager: React.FC<DesignBriefManagerProps> = ({ briefs, setBriefs, currentUser }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrief, setEditingBrief] = useState<DesignBrief | null>(null);
  const [viewingBrief, setViewingBrief] = useState<DesignBrief | null>(null);

  const handleSaveBrief = (brief: Omit<DesignBrief, 'id' | 'createdAt'>) => {
    if (editingBrief) {
      setBriefs(prev => prev.map(b => b.id === editingBrief.id ? { ...brief, id: b.id, createdAt: b.createdAt } : b));
    } else {
      setBriefs(prev => [{ ...brief, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() }, ...prev]);
    }
    setIsFormOpen(false);
    setEditingBrief(null);
  };

  const handleDeleteBrief = (id: string) => {
    if (confirm('Hapus brief desain ini secara permanen?')) {
      setBriefs(prev => prev.filter(b => b.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (viewingBrief) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-10 print:hidden">
          <button 
            onClick={() => setViewingBrief(null)}
            className="text-zinc-500 hover:text-white flex items-center gap-2 font-black uppercase text-[10px] tracking-widest px-4 py-2 hover:bg-white/10 rounded-none transition-all"
          >
            <X className="w-4 h-4" />
            <span>KEMBALI KE PANEL</span>
          </button>
          <button 
            onClick={handlePrint}
            className="bg-[#ff5a00] hover:bg-[#e65100] text-white px-8 py-3.5 rounded-none font-black uppercase text-[11px] tracking-widest flex items-center gap-2 shadow-lg shadow-orange-950/20"
          >
            <Printer className="w-4 h-4" />
            <span>CETAK BRIEF</span>
          </button>
        </div>
        <DesignBriefTemplate brief={viewingBrief} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none professional-card">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#ff5a00] rounded-none flex items-center justify-center shadow-lg shadow-orange-950/20">
            <PenTool className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white heading-font uppercase italic">Design Brief Manager</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sistem Dokumentasi Proyek Kreatif</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setEditingBrief(null);
            setIsFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-white text-black font-black text-[11px] uppercase tracking-widest px-10 py-5 rounded-none hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>BUAT BRIEF BARU</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {briefs.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-black/40 border border-white/10 rounded-none backdrop-blur-sm">
            <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Database brief masih kosong.</p>
          </div>
        ) : (
          briefs.map((brief) => (
            <div key={brief.id} className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none hover:border-[#ff5a00]/30 transition-all group relative overflow-hidden professional-card flex flex-col">
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => { setEditingBrief(brief); setIsFormOpen(true); }} className="p-2 text-zinc-500 hover:text-[#ff5a00]"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteBrief(brief.id)} className="p-2 text-zinc-500 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
               </div>
               <div className="flex items-start justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#ff5a00] tracking-widest uppercase mb-1">{brief.pemilihanPaket} PACKAGE</span>
                    <h4 className="text-base font-black text-white truncate max-w-[160px] heading-font uppercase">{brief.namaLogo}</h4>
                  </div>
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-none border ${brief.status.finish ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                    {brief.status.finish ? 'FINISHED' : 'IN PROGRESS'}
                  </span>
               </div>
               <div className="space-y-3 mb-8 flex-1">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Usaha:</span>
                    <span className="text-zinc-300 truncate ml-2">{brief.jenisUsaha}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Deadline:</span>
                    <span className="text-rose-500 font-black">{brief.deadline}</span>
                  </div>
               </div>
               <button 
                onClick={() => setViewingBrief(brief)}
                className="w-full bg-white/5 hover:bg-[#ff5a00] text-zinc-400 hover:text-white transition-all py-3.5 rounded-none text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
               >
                 <Eye className="w-4 h-4" />
                 Tampilkan Dokumen
               </button>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <DesignBriefForm 
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveBrief}
          initialData={editingBrief || undefined}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default DesignBriefManager;
