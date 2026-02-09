
import React from 'react';
import { ShieldCheck, Cpu, Database, Activity, Target } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden min-h-[calc(100vh-200px)]">
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <div className="mb-12">
            <div className="w-32 h-32 bg-black border border-zinc-900 rounded-none flex items-center justify-center professional-shadow mx-auto mb-8">
                <span className="text-white font-black text-5xl italic heading-font">GR</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold heading-font tracking-tight text-white mb-4 uppercase italic">
              GR <span className="text-[#ff5a00]">FINANCE</span>
            </h1>
            <p className="text-zinc-600 text-lg md:text-xl font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              Solusi manajemen keuangan terpadu untuk efisiensi bisnis Anda. Pantau omset, biaya operasional, dan laba rugi dalam satu dashboard industrial.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-6">
          <FeatureCard icon={<ShieldCheck className="w-5 h-5" />} label="Keamanan Data" desc="Ter-enkripsi" />
          <FeatureCard icon={<Target className="w-5 h-5" />} label="Akurasi" desc="Presisi 100%" />
          <FeatureCard icon={<Activity className="w-5 h-5" />} label="Real-time" desc="Monitor Aktif" />
          <FeatureCard icon={<Cpu className="w-5 h-5" />} label="Kecerdasan AI" desc="Analisis Cerdas" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, label, desc }: any) => (
  <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 rounded-none flex flex-col items-center space-y-2 hover:border-[#ff5a00]/30 transition-all professional-shadow group">
    <div className="w-10 h-10 bg-black rounded-none flex items-center justify-center text-[#ff5a00] group-hover:bg-[#ff5a00] group-hover:text-white transition-all">{icon}</div>
    <span className="text-[11px] font-black text-white heading-font uppercase tracking-widest">{label}</span>
    <span className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">{desc}</span>
  </div>
);

export default Home;
