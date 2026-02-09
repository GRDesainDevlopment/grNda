
import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Plus, Camera } from 'lucide-react';
import { DesignBrief, User } from '../types';

interface DesignBriefFormProps {
  onClose: () => void;
  onSave: (brief: Omit<DesignBrief, 'id' | 'createdAt'>) => void;
  initialData?: DesignBrief;
  currentUser: User;
}

const DesignBriefForm: React.FC<DesignBriefFormProps> = ({ onClose, onSave, initialData, currentUser }) => {
  const [formData, setFormData] = useState<Omit<DesignBrief, 'id' | 'createdAt'>>({
    status: {
      prosesDesign: false,
      preview: false,
      revisi: false,
      finish: false,
      bonus: false,
    },
    namaLogo: '',
    slogan: '',
    jenisUsaha: '',
    deadline: '',
    pemilihanPaket: 'GOLD',
    lunasAmount: '',
    jenisLogo: '',
    dominanColor: '',
    kebutuhanLogo: [],
    konsepDetail: '',
    clientColor: '',
    catatan: '',
    sliders: {
      style: 5,
      practical: 5,
      abstract: 5,
      retro: 5,
      funny: 5,
      basic: 5,
    },
    referensi: [],
    pembuatBrief: currentUser.username,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      const { id, createdAt, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const toggleKebutuhan = (item: string) => {
    setFormData(prev => ({
      ...prev,
      kebutuhanLogo: prev.kebutuhanLogo.includes(item)
        ? prev.kebutuhanLogo.filter(i => i !== item)
        : [...prev.kebutuhanLogo, item]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            referensi: [...prev.referensi, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSliderChange = (key: keyof typeof formData.sliders, val: string) => {
    setFormData(prev => ({
      ...prev,
      sliders: { ...prev.sliders, [key]: parseInt(val) }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full px-5 py-4 text-sm font-bold uppercase tracking-tight bg-black/50 border-white/10 text-white outline-none focus:border-[#ff5a00] border transition-all";
  const labelClass = "text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="w-full max-w-5xl bg-black/80 border border-white/10 rounded-none overflow-hidden shadow-2xl my-auto professional-card">
        <div className="flex items-center justify-between p-10 border-b border-white/10 bg-black/50">
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-white heading-font uppercase italic">Brief Desain Editor</h3>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Konfigurasi Project Kreatif</span>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-none transition-all text-zinc-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Status Checkboxes */}
          <div className="flex flex-wrap gap-8 border-b border-white/10 pb-8">
            {Object.keys(formData.status).map((key) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={(formData.status as any)[key]} 
                  onChange={(e) => setFormData({...formData, status: {...formData.status, [key]: e.target.checked}})}
                  className="w-5 h-5 rounded-none accent-[#ff5a00] bg-black/50 border-white/10"
                />
                <span className="text-[10px] font-black text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">DATA UTAMA LOGO</h4>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Nama Logo</label>
                  <input className={inputClass} value={formData.namaLogo} onChange={e => setFormData({...formData, namaLogo: e.target.value})} placeholder="EX: jadipindahan.id" />
                </div>
                <div>
                  <label className={labelClass}>Jenis Usaha</label>
                  <input className={inputClass} value={formData.jenisUsaha} onChange={e => setFormData({...formData, jenisUsaha: e.target.value})} placeholder="EX: Jasa Pindahan" />
                </div>
                <div>
                  <label className={labelClass}>Slogan (Optional)</label>
                  <input className={inputClass} value={formData.slogan} onChange={e => setFormData({...formData, slogan: e.target.value})} placeholder="EX: Pindahan Mudah dan Hemat" />
                </div>
                <div>
                  <label className={labelClass}>Deadline</label>
                  <input className={inputClass} value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} placeholder="EX: Rabu-Kamis 05 Feb 2026" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">KONFIGURASI PAKET</h4>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Pemilihan Paket</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['UMKM', 'STANDAR', 'GOLD', 'PLATINUM'].map(p => (
                      <button 
                        key={p} type="button" 
                        onClick={() => setFormData({...formData, pemilihanPaket: p as any})}
                        className={`py-3 px-4 text-[10px] font-black tracking-widest transition-all ${formData.pemilihanPaket === p ? 'bg-[#ff5a00] text-white' : 'bg-black/50 text-zinc-500 hover:bg-white/10'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Status Lunas (IDR)</label>
                  <input className={inputClass} value={formData.lunasAmount} onChange={e => setFormData({...formData, lunasAmount: e.target.value})} placeholder="550rb" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">ESTETIKA & KONSEP</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelClass}>Jenis Logo yang diinginkan</label>
                <input className={inputClass} value={formData.jenisLogo} onChange={e => setFormData({...formData, jenisLogo: e.target.value})} placeholder="EX: Text Symbol, Vector, Full Text" />
              </div>
              <div>
                <label className={labelClass}>Dominan Color</label>
                <input className={inputClass} value={formData.dominanColor} onChange={e => setFormData({...formData, dominanColor: e.target.value})} placeholder="EX: Orange & Black" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">KEBUTUHAN OUTPUT</h4>
            <div className="flex flex-wrap gap-4">
              {['Stationery', 'social media', 'website', 'media cetak', 'packaging'].map(item => (
                <button 
                  key={item} type="button"
                  onClick={() => toggleKebutuhan(item)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${formData.kebutuhanLogo.includes(item) ? 'bg-[#ff5a00] border-[#ff5a00] text-white' : 'border-white/10 text-zinc-500 hover:border-zinc-500'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">DETAIL KONSEP</h4>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Konsep Detail Desain</label>
                  <textarea className={`${inputClass} h-32 resize-none`} value={formData.konsepDetail} onChange={e => setFormData({...formData, konsepDetail: e.target.value})} placeholder="Menggunakan jenis logo full text referensi indobuz..." />
                </div>
                <div>
                  <label className={labelClass}>Client menyukai warna</label>
                  <input className={inputClass} value={formData.clientColor} onChange={e => setFormData({...formData, clientColor: e.target.value})} placeholder="Warna seperti indobuz" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">VISUAL PREFERENCE SLIDERS</h4>
              <div className="space-y-6">
                <Slider labelLeft="FLAT" labelRight="GRADIENT" value={formData.sliders.style} onChange={v => handleSliderChange('style', v)} />
                <Slider labelLeft="PRACTICAL" labelRight="LUXURY" value={formData.sliders.practical} onChange={v => handleSliderChange('practical', v)} />
                <Slider labelLeft="ABSTRACT" labelRight="ELEGANT" value={formData.sliders.abstract} onChange={v => handleSliderChange('abstract', v)} />
                <Slider labelLeft="RETRO" labelRight="MODERN" value={formData.sliders.retro} onChange={v => handleSliderChange('retro', v)} />
                <Slider labelLeft="FUNNY" labelRight="SERIOUS" value={formData.sliders.funny} onChange={v => handleSliderChange('funny', v)} />
                <Slider labelLeft="BASIC" labelRight="SCRIPT" value={formData.sliders.basic} onChange={v => handleSliderChange('basic', v)} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">REFERENSI & GAMBAR</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {formData.referensi.map((img, i) => (
                <div key={i} className="aspect-square bg-black/50 border border-white/10 relative group overflow-hidden">
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, referensi: formData.referensi.filter((_, idx) => idx !== i)})}
                    className="absolute inset-0 bg-rose-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square bg-black/50 border-2 border-dashed border-white/10 text-zinc-500 hover:text-[#ff5a00] hover:border-[#ff5a00]/30 transition-all flex flex-col items-center justify-center gap-2"
              >
                <Camera className="w-6 h-6" />
                <span className="text-[8px] font-black uppercase tracking-widest">Tambah Referensi</span>
              </button>
            </div>
            <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>

          <div className="space-y-4">
            <label className={labelClass}>Pembuat Brief</label>
            <input className={inputClass} value={formData.pembuatBrief} onChange={e => setFormData({...formData, pembuatBrief: e.target.value})} />
          </div>
        </form>

        <div className="p-10 bg-black/80 border-t border-white/10 flex justify-end">
          <button 
            type="button"
            onClick={handleSubmit}
            className="bg-[#ff5a00] hover:bg-[#e65100] text-white font-black uppercase tracking-widest py-5 px-14 rounded-none shadow-xl shadow-orange-950/20 transition-all flex items-center gap-3 active:scale-[0.98]"
          >
            <Check className="w-5 h-5" />
            <span>SIMPAN DATA BRIEF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ labelLeft, labelRight, value, onChange }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[8px] font-black text-zinc-500 tracking-widest">
      <span>{labelLeft}</span>
      <span>{labelRight}</span>
    </div>
    <input 
      type="range" min="0" max="10" step="1" 
      value={value} onChange={e => onChange(e.target.value)}
      className="w-full h-1 bg-zinc-800 rounded-none appearance-none accent-[#ff5a00] cursor-pointer" 
    />
  </div>
);

const Trash2Icon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

export default DesignBriefForm;
