
import React from 'react';
import { DesignBrief } from '../types';

interface DesignBriefTemplateProps {
  brief: DesignBrief;
}

const DesignBriefTemplate: React.FC<DesignBriefTemplateProps> = ({ brief }) => {
  return (
    <div className="bg-white text-black p-0 shadow-2xl max-w-[800px] mx-auto min-h-[1050px] relative font-sans flex flex-col print:shadow-none print:max-w-none">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-10 overflow-hidden">
        <div className="flex flex-col">
            <div className="flex items-center space-x-4 p-10 pr-20 bg-black rounded-br-[100px] text-white shadow-xl">
                <div className="w-16 h-16 bg-[#cc0000] rounded-full flex items-center justify-center font-black italic text-3xl shadow-inner">GR</div>
                <div className="flex flex-col">
                    <span className="text-3xl font-black italic tracking-tighter leading-none uppercase">GR Desain</span>
                    <span className="text-[10px] font-medium tracking-[0.3em] uppercase mt-1">whatever you want</span>
                </div>
            </div>
            <div className="h-4 bg-[#cc0000] w-full mt-1 shadow-sm"></div>
        </div>
        <div className="p-10 text-right flex flex-col items-end">
            <h1 className="text-5xl font-black italic tracking-tighter leading-tight">BRIEF</h1>
            <h1 className="text-5xl font-black italic tracking-tighter leading-tight text-[#cc0000] -mt-2">DESAIN</h1>
        </div>
      </div>

      {/* STATUS CHECKBOXES ROW */}
      <div className="px-16 mb-8 flex flex-wrap gap-8">
         {Object.entries(brief.status).map(([key, val]) => (
            <div key={key} className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 border-black flex items-center justify-center ${val ? 'bg-black' : ''}`}>
                    {val && <div className="w-2 h-2 bg-white"></div>}
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
            </div>
         ))}
         <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest">Lunas :</span>
            <span className="text-[11px] font-black underline">{brief.lunasAmount}</span>
         </div>
      </div>

      {/* INFO GRID */}
      <div className="px-16 grid grid-cols-2 gap-x-12 gap-y-6 mb-10">
          <div className="space-y-4">
              <DetailRow label="NAMA LOGO" value={brief.namaLogo} />
              <DetailRow label="JENIS USAHA" value={brief.jenisUsaha} />
              <DetailRow label="SLOGAN" value={brief.slogan} />
              <DetailRow label="DEADLINE" value={brief.deadline} />
          </div>
          <div className="space-y-4">
              <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">PEMILIHAN PAKET</label>
                  <div className="flex flex-wrap gap-3">
                      {['UMKM', 'STANDAR', 'GOLD', 'PLATINUM'].map(p => (
                          <div key={p} className="flex items-center gap-1.5">
                              <div className={`w-3 h-3 rounded-full border-2 border-black ${brief.pemilihanPaket === p ? 'bg-[#cc0000]' : ''}`}></div>
                              <span className="text-[10px] font-black">{p}</span>
                          </div>
                      ))}
                  </div>
              </div>
              <DetailRow label="JENIS LOGO" value={brief.jenisLogo} />
              <DetailRow label="DOMINAN COLOR" value={brief.dominanColor} />
          </div>
      </div>

      {/* KEBUTUHAN LOGO */}
      <div className="px-16 mb-10">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-3">KEBUTUHAN LOGO</label>
          <div className="flex flex-wrap gap-6">
              {['Stationery', 'social media', 'website', 'media cetak', 'packaging'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                       <div className={`w-4 h-4 rounded-full border border-black flex items-center justify-center ${brief.kebutuhanLogo.includes(item) ? 'bg-[#cc0000]' : ''}`}>
                           {brief.kebutuhanLogo.includes(item) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                       </div>
                       <span className="text-[10px] font-black uppercase">{item}</span>
                  </div>
              ))}
              <div className="flex-1 border-b border-black h-4 ml-4"></div>
          </div>
      </div>

      {/* KONSEP DETAIL */}
      <div className="px-16 mb-10 grid grid-cols-[1fr_250px] gap-12">
          <div className="border border-black p-6 relative rounded-lg">
              <span className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-black uppercase tracking-widest">Konsep Detail Desain</span>
              <div className="space-y-4">
                  <p className="text-[13px] font-bold min-h-[100px] leading-relaxed whitespace-pre-wrap">{brief.konsepDetail}</p>
                  <div className="pt-4 border-t border-dashed border-zinc-200">
                      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Client menyukai warna :</p>
                      <p className="text-[12px] font-bold">{brief.clientColor}</p>
                  </div>
                  <div className="pt-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Catatan :</p>
                      <p className="text-[12px] font-bold">{brief.catatan || '-'}</p>
                  </div>
              </div>
          </div>

          <div className="space-y-6 pt-4">
               <PrintSlider labelLeft="FLAT" labelRight="GRADIENT" value={brief.sliders.style} />
               <PrintSlider labelLeft="PRACTICAL" labelRight="LUXURY" value={brief.sliders.practical} />
               <PrintSlider labelLeft="ABSTRACT" labelRight="ELEGANT" value={brief.sliders.abstract} />
               <PrintSlider labelLeft="RETRO" labelRight="MODERN" value={brief.sliders.retro} />
               <PrintSlider labelLeft="FUNNY" labelRight="SERIOUS" value={brief.sliders.funny} />
               <PrintSlider labelLeft="BASIC" labelRight="SCRIPT" value={brief.sliders.basic} />
          </div>
      </div>

      {/* REFERENSI */}
      <div className="px-16 flex-1 mb-10">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-4">REFERENSI</label>
          <div className="grid grid-cols-4 gap-4">
              {brief.referensi.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-square border border-zinc-200 overflow-hidden rounded-lg">
                      <img src={img} className="w-full h-full object-cover" />
                  </div>
              ))}
              {Array.from({length: Math.max(0, 4 - brief.referensi.length)}).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square border-2 border-dashed border-zinc-100 rounded-lg"></div>
              ))}
          </div>
      </div>

      {/* FOOTER AREA */}
      <div className="px-16 pb-12">
          <div className="flex justify-between items-end">
               <div className="flex flex-col items-center">
                    <div className="text-[10px] font-black mb-1 text-zinc-400 uppercase tracking-widest">DI BUAT OLEH</div>
                    <div className="flex flex-col items-center">
                         <div className="w-32 h-20 flex items-center justify-center opacity-30 italic text-zinc-400">Signed</div>
                         <span className="text-[14px] font-black border-b-2 border-black uppercase tracking-tighter">{brief.pembuatBrief}</span>
                    </div>
               </div>
               <div className="flex flex-col items-center">
                    <div className="w-32 h-32 border-2 border-dashed border-zinc-100 rounded-lg flex items-center justify-center text-center">
                         <span className="text-[8px] font-black text-zinc-200 uppercase tracking-widest">STAMPLE FOR<br/>CONFIRMATION</span>
                    </div>
               </div>
          </div>
      </div>

      {/* BOTTOM STRIPE */}
      <div className="mt-auto">
        <div className="bg-[#cc0000] h-10 flex items-center justify-between px-10 text-white rounded-t-[50px] mx-10">
            <div className="flex items-center space-x-2 text-[10px] font-black tracking-widest uppercase">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#cc0000]">W</div>
                <span>www.grdesain.com</span>
            </div>
            <div className="flex space-x-6 text-[9px] font-bold uppercase">
                <div className="flex items-center space-x-1"><span>WA:</span> 0812 2075 8211</div>
                <div className="flex items-center space-x-1"><span>IG:</span> gr_desain.inc</div>
                <div className="flex items-center space-x-1"><span>FB:</span> gr desain</div>
            </div>
        </div>
        <div className="bg-black h-12"></div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">{label} :</label>
        <div className="text-[14px] font-black uppercase tracking-tight border-b border-zinc-200 pb-1">{value || '_________________'}</div>
    </div>
);

const PrintSlider = ({ labelLeft, labelRight, value }: { labelLeft: string, labelRight: string, value: number }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[7px] font-black tracking-widest text-zinc-400">
            <span>{labelLeft}</span>
            <span>{labelRight}</span>
        </div>
        <div className="h-2 bg-zinc-100 relative rounded-full overflow-hidden">
            <div className="absolute top-0 bottom-0 bg-[#cc0000]" style={{ left: `calc(${(value / 10) * 100}% - 4px)`, width: '8px' }}></div>
        </div>
    </div>
);

export default DesignBriefTemplate;
