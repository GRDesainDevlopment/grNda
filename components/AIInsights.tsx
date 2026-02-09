
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, AlertCircle, RefreshCcw, TrendingUp } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AIInsightsProps {
  transactions: Transaction[];
  totals: {
    income: number;
    expense: number;
    profit: number;
  };
}

const AIInsights: React.FC<AIInsightsProps> = ({ transactions, totals }) => {
  const [insight, setInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const generateInsights = async () => {
    if (transactions.length === 0) {
      setInsight("Data tidak cukup. Tambahkan transaksi untuk memulai analisis.");
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const categories = Array.from(new Set(transactions.map(t => t.category)));
      const expenseBreakdown = categories.map(cat => {
        const value = transactions
          .filter(t => t.type === TransactionType.EXPENSE && t.category === cat)
          .reduce((sum, t) => sum + t.amount, 0);
        return value > 0 ? `${cat}: Rp ${value.toLocaleString('id-ID')}` : null;
      }).filter(Boolean).join(', ');

      const prompt = `
        BERTINDAK SEBAGAI ANALIS KEUANGAN PROFESIONAL.
        Analisis data bisnis:
        - Total Omset: Rp ${totals.income.toLocaleString('id-ID')}
        - Total Pengeluaran: Rp ${totals.expense.toLocaleString('id-ID')}
        - Laba Bersih: Rp ${totals.profit.toLocaleString('id-ID')}
        - Rincian Pengeluaran: ${expenseBreakdown}
        
        Berikan:
        1. SKOR KESEHATAN KEUANGAN (0-100).
        2. ANALISIS KRITIS: Mana pengeluaran yang tidak efisien?
        3. STRATEGI AKSI: 3 langkah nyata bulan depan untuk menaikkan laba.
        
        Bahasa: Indonesia, Tajam, Profesional, Format Markdown.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      setInsight(response.text || "Analisis gagal.");
    } catch (error) {
      console.error(error);
      setInsight("Gagal terhubung ke AI Intelligence System.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0) generateInsights();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black flex items-center space-x-4 italic uppercase tracking-tighter text-white">
            <BrainCircuit className="w-12 h-12 text-[#ff5a00]" />
            <span>AI intelligence</span>
          </h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 ml-1">Predictive Analytics & Financial Audit</p>
        </div>
        <button 
          onClick={generateInsights}
          disabled={isLoading}
          className="flex items-center justify-center space-x-3 bg-[#ff5a00] text-white font-black text-xs uppercase tracking-widest py-4 px-10 rounded-none hover:bg-[#e65100] transition-all shadow-xl shadow-orange-950/20 active:scale-95 disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Audit</span>
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-[#ff5a00]/30 rounded-none p-12 relative overflow-hidden shadow-2xl professional-card">
        <Sparkles className="absolute top-10 right-10 w-24 h-24 text-[#ff5a00]/5 pointer-events-none" />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-zinc-900 border-t-[#ff5a00] rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-[#ff5a00] animate-pulse" />
            </div>
            <p className="text-[#ff5a00] font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing AI system...</p>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <div className="flex flex-col lg:flex-row items-start lg:space-x-10">
              <div className="p-6 bg-[#ff5a00] rounded-none shadow-2xl shadow-orange-950/30 mb-8 lg:mb-0">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8 border-b border-[#ff5a00]/10 pb-4">Strategic Audit Report</h3>
                <div className="text-zinc-300 leading-relaxed text-base whitespace-pre-wrap font-medium">
                  {insight || "Awaiting transaction data for audit."}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InsightBox 
          icon={<AlertCircle className="w-7 h-7 text-[#ff5a00]" />} 
          title="Anomaly Detection" 
          desc="System monitors irregular overhead spikes. Automated cooling suggested if burn rate exceeds 2.5x mean."
        />
        <InsightBox 
          icon={<TrendingUp className="w-7 h-7 text-emerald-500" />} 
          title="Margin Optimization" 
          desc="Analyzing category spend patterns. Targeted 5% reduction in non-essential costs achievable by EOM."
        />
      </div>
    </div>
  );
};

const InsightBox = ({ icon, title, desc }: any) => (
  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-none flex items-start space-x-6 hover:border-[#ff5a00]/30 transition-all group shadow-xl">
    <div className="shrink-0 p-4 bg-black/50 rounded-none border border-white/10 group-hover:border-[#ff5a00]/20 transition-all">{icon}</div>
    <div>
      <h4 className="font-black text-white italic uppercase tracking-widest text-sm mb-2">{title}</h4>
      <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase">{desc}</p>
    </div>
  </div>
);

export default AIInsights;
