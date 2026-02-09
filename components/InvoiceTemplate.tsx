
import React from 'react';
import { Invoice } from '../types';

interface InvoiceTemplateProps {
  invoice: Invoice;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ invoice }) => {
  return (
    <div className="bg-white text-black p-0 shadow-2xl max-w-[900px] mx-auto min-h-[1150px] relative font-sans flex flex-col print:shadow-none print:max-w-none print:mx-0">
      
      {/* HEADER SECTION - Industrial Black & Orange */}
      <div className="flex justify-between items-start mb-12 overflow-hidden">
        <div className="flex flex-col w-3/5">
            <div className="flex items-center space-x-6 p-10 pr-24 bg-black rounded-br-[120px] text-white shadow-2xl relative z-10">
                <div className="w-20 h-20 bg-[#ff5a00] rounded-full flex items-center justify-center font-black italic text-4xl shadow-inner border-2 border-white/20">GR</div>
                <div className="flex flex-col">
                    <span className="text-4xl font-black italic tracking-tighter leading-none uppercase">GR Desain</span>
                    <span className="text-[11px] font-semibold tracking-[0.4em] uppercase mt-2 opacity-80">whatever you want</span>
                </div>
            </div>
            <div className="h-4 bg-[#ff5a00] w-full mt-1.5 shadow-md"></div>
        </div>
        <div className="p-10 text-right flex flex-col items-end pr-12">
            <h1 className="text-6xl font-black italic tracking-tighter leading-tight text-zinc-900">INVOICE</h1>
            <h1 className="text-7xl font-black italic tracking-tighter leading-none text-[#ff5a00] -mt-3">ORDER</h1>
        </div>
      </div>

      <div className="flex flex-col px-16 flex-1">
        {/* CUSTOMER & PAYMENT DETAILS GRID */}
        <div className="grid grid-cols-2 gap-24 mb-16">
          <div className="space-y-6">
              <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400">TO MR./MS. :</h3>
              <h2 className="text-5xl font-black tracking-tighter uppercase text-zinc-900 leading-none">{invoice.customerName || 'CLIENT NAME'}</h2>
              
              <div className="space-y-3 pt-4 text-[14px]">
                  <div className="grid grid-cols-[140px_1fr] items-center">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Phone Number</span>
                      <span className="font-bold flex items-center">
                          <span className="bg-[#ff5a00] text-[9px] text-white px-2 py-0.5 rounded-sm font-black mr-2">IND</span>
                          : <span className="ml-1 text-zinc-800">{invoice.phoneNumber || '-'}</span>
                      </span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Company</span>
                      <span className="font-bold uppercase">: <span className="ml-1 text-zinc-800">{invoice.company || '-'}</span></span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Address</span>
                      <span className="font-bold uppercase">: <span className="ml-1 text-zinc-800 leading-tight">{invoice.address || '-'}</span></span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Package</span>
                      <span className="font-bold uppercase">: <span className="ml-1 text-zinc-800">{invoice.package || 'CUSTOM'}</span></span>
                  </div>
              </div>
          </div>

          <div className="space-y-6 pt-12">
              <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ff5a00] border-b-2 border-[#ff5a00] inline-block pb-1">PAYMENT DETAIL :</h3>
              <div className="space-y-3 text-[14px]">
                  <div className="grid grid-cols-[150px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Invoice Number</span>
                      <span className="font-bold">: <span className="ml-1 text-zinc-800">{invoice.invoiceNumber}</span></span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Invoice Date</span>
                      <span className="font-bold">: <span className="ml-1 text-zinc-800">{new Date(invoice.invoiceDate).toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit', year:'2-digit'}).replace(/\//g, '-')}</span></span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Purchase Date</span>
                      <span className="font-bold">: <span className="ml-1 text-zinc-800">{new Date(invoice.purchaseDate).toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit', year:'2-digit'}).replace(/\//g, '-')}</span></span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr]">
                      <span className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Job Status</span>
                      <span className="font-bold uppercase">: <span className="ml-1 text-[#ff5a00]">{invoice.jobStatus}</span></span>
                  </div>
              </div>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="mb-12">
            <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
              <table className="w-full text-left">
                  <thead className="bg-[#ff5a00] text-white text-[11px] font-black uppercase tracking-[0.2em]">
                      <tr>
                          <th className="px-10 py-5">JOB DESKRIPSI</th>
                          <th className="px-10 py-5 text-center w-32">QUANTITY</th>
                          <th className="px-10 py-5 text-right w-56">AMOUNT (IDR)</th>
                      </tr>
                  </thead>
                  <tbody className="text-[15px]">
                      {invoice.items.map((item, idx) => (
                          <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}>
                              <td className="px-10 py-7 font-bold text-zinc-800">
                                  <div className="flex flex-col">
                                      <span className="uppercase text-lg tracking-tight">{item.description}</span>
                                      <span className="text-zinc-400 font-bold text-[11px] mt-1 uppercase tracking-widest">{invoice.company || 'CLIENT PROJECT'}</span>
                                  </div>
                              </td>
                              <td className="px-10 py-7 text-center font-black text-zinc-900">{item.quantity}</td>
                              <td className="px-10 py-7 text-right font-black text-zinc-900 bg-zinc-100/30">
                                  Rp. {item.amount.toLocaleString('id-ID')}
                              </td>
                          </tr>
                      ))}
                      
                      {/* SUMMARY ROWS */}
                      <tr className="border-t-2 border-zinc-50">
                          <td colSpan={2} className="px-10 py-3 text-right font-black uppercase tracking-widest text-zinc-400 text-[10px]">SUBTOTAL</td>
                          <td className="px-10 py-3 text-right font-bold text-zinc-800 bg-zinc-100/20">Rp. {invoice.subtotal.toLocaleString('id-ID')}</td>
                      </tr>
                      <tr>
                          <td colSpan={2} className="px-10 py-3 text-right font-black uppercase tracking-widest text-zinc-400 text-[10px]">PAYMENT</td>
                          <td className="px-10 py-3 text-right font-bold text-zinc-800 bg-zinc-100/20">Rp. {invoice.paymentAmount.toLocaleString('id-ID')}</td>
                      </tr>
                      <tr>
                          <td colSpan={2} className="px-10 py-3 text-right font-black uppercase tracking-widest text-zinc-400 text-[10px]">PPN</td>
                          <td className="px-10 py-3 text-right font-bold text-zinc-800 bg-zinc-100/20">{invoice.ppn.toLocaleString('id-ID', {minimumFractionDigits: 2})} %</td>
                      </tr>
                      <tr className="border-t border-zinc-100">
                          <td colSpan={2} className="px-10 py-8 text-right flex items-center justify-end">
                            <span className="font-black uppercase tracking-tighter text-2xl text-zinc-900">PAYMENT STATUS</span>
                          </td>
                          <td className="px-10 py-8">
                              <div className={`w-full py-3.5 rounded-2xl text-center font-black text-white text-xl shadow-lg transform transition-all hover:scale-[1.02] ${invoice.isPaid ? 'bg-[#ff5a00] shadow-[#ff5a00]/20' : 'bg-zinc-200 text-zinc-400 shadow-none'}`}>
                                  {invoice.isPaid ? 'LUNAS' : 'PENDING'}
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>

        {/* PAYMENT METHOD & SIGNATURES SECTION */}
        <div className="mb-12">
            <h3 className="text-[12px] font-black uppercase text-[#ff5a00] mb-5 tracking-widest">PAYMENT METHOD :</h3>
            <div className="space-y-2 text-[15px] font-bold text-zinc-800">
                <div className="grid grid-cols-[140px_1fr]"><span className="text-zinc-400 uppercase text-[10px] tracking-widest">Account No.</span> <span className="font-black">: {invoice.accountNo}</span></div>
                <div className="grid grid-cols-[140px_1fr]"><span className="text-zinc-400 uppercase text-[10px] tracking-widest">Account Name</span> <span className="font-black">: {invoice.accountName}</span></div>
                <div className="grid grid-cols-[140px_1fr]"><span className="text-zinc-400 uppercase text-[10px] tracking-widest">Bank Name</span> <span className="font-black">: {invoice.bankName}</span></div>
            </div>
        </div>

        <div className="flex justify-between items-end pt-12 pb-16">
            <div className="flex flex-col items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-20">MANAGEMENT GR DESAIN</span>
                <div className="flex flex-col items-center">
                    <div className="w-40 h-1 relative flex items-center justify-center italic text-xl font-serif text-zinc-200 opacity-20 pointer-events-none mb-12 select-none">
                      Authorized Signature
                    </div>
                    <span className="text-[16px] font-black border-b-2 border-zinc-900 uppercase tracking-tight text-zinc-900 px-2">ROSITA ICHSANA DEVY</span>
                </div>
            </div>
            <div className="flex flex-col items-center relative">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-20">CEO GR DESAIN</span>
                <div className="flex flex-col items-center relative">
                    <div className="absolute -top-16 -left-8 w-24 h-24 bg-[#ff5a00]/10 border-2 border-[#ff5a00]/30 rounded-full flex items-center justify-center text-[11px] text-[#ff5a00] font-black italic rotate-[-20deg] opacity-80 shadow-inner z-0">
                      GR STAMP
                    </div>
                    <div className="w-44 h-4 mb-12 pointer-events-none select-none"></div>
                    <span className="text-[16px] font-black border-b-2 border-zinc-900 uppercase tracking-tight text-zinc-900 px-2 relative z-10">GHANIY RIZKY, ST</span>
                </div>
            </div>
        </div>
      </div>

      {/* FOOTER SECTION - Branded Bar */}
      <div className="mt-auto">
        <div className="flex justify-center py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50/50">
            Jl. Ion Martasasmita No.2 Kec. Pamanukan Kab. Subang
            <span className="mx-4 text-zinc-200">|</span>
            Kode Pos 41254 Provinsi Jawa Barat - Indonesia
        </div>
        <div className="bg-[#ff5a00] h-12 flex items-center justify-between px-16 text-white rounded-t-[60px] mx-12 shadow-2xl relative z-20">
            <div className="flex items-center space-x-3 text-[11px] font-black tracking-[0.3em] uppercase">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#ff5a00] font-black">W</div>
                <span>WWW.GRDESAIN.COM</span>
            </div>
            <div className="flex space-x-8 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center space-x-2"><span className="opacity-70">WA:</span> 0812 2075 8211</div>
                <div className="flex items-center space-x-2"><span className="opacity-70">IG:</span> GR_DESAIN.INC</div>
                <div className="flex items-center space-x-2"><span className="opacity-70">FB:</span> GR DESAIN</div>
            </div>
        </div>
        <div className="bg-black h-16 w-full mt-[-24px] relative z-10"></div>
      </div>

    </div>
  );
};

export default InvoiceTemplate;
