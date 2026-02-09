
import React, { useState } from 'react';
import { Plus, FileText, Trash2, Printer, X, Check, MoreVertical, Download } from 'lucide-react';
import { Invoice, InvoiceItem } from '../types';
import InvoiceTemplate from './InvoiceTemplate';

interface InvoiceManagerProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

const InvoiceManager: React.FC<InvoiceManagerProps> = ({ invoices, setInvoices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  const [formData, setFormData] = useState<Omit<Invoice, 'id' | 'createdAt'>>({
    customerName: '',
    phoneNumber: '',
    company: '',
    address: '',
    package: 'Custom',
    invoiceNumber: `CSTM${(invoices.length + 1).toString().padStart(3, '0')}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    purchaseDate: new Date().toISOString().split('T')[0],
    jobStatus: 'ON PROSES',
    items: [{ id: '1', description: '', quantity: '', amount: 0 }],
    subtotal: 0,
    paymentAmount: 0,
    ppn: 0,
    accountNo: '2230974643',
    accountName: 'PT. GHANIY RIZKY INC',
    bankName: 'BCA',
    isPaid: true
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: '', amount: 0 }]
    });
  };

  const handleRemoveItem = (id: string) => {
    if (formData.items.length === 1) return;
    const newItems = formData.items.filter(item => item.id !== id);
    calculateSubtotal(newItems);
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const newItems = formData.items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    calculateSubtotal(newItems);
  };

  const calculateSubtotal = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    setFormData({ ...formData, items, subtotal });
  };

  const handleSave = () => {
    if (selectedInvoice) {
      setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? { ...formData, id: inv.id, createdAt: inv.createdAt } : inv));
    } else {
      setInvoices([{ ...formData, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() }, ...invoices]);
    }
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus invoice ini secara permanen?')) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (viewingInvoice) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-10 print:hidden">
          <button 
            onClick={() => setViewingInvoice(null)}
            className="text-zinc-500 hover:text-white flex items-center gap-2 font-black uppercase text-[10px] tracking-widest px-4 py-2 hover:bg-white/10 rounded-none transition-all"
          >
            <X className="w-4 h-4" />
            <span>KEMBALI KE PANEL</span>
          </button>
          <button 
            onClick={handlePrint}
            className="bg-[#ff5a00] hover:bg-[#e65100] text-white px-8 py-3.5 rounded-none font-black uppercase text-[11px] tracking-widest flex items-center gap-2 shadow-lg shadow-orange-950/20"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT FILE KE PDF</span>
          </button>
        </div>
        <InvoiceTemplate invoice={viewingInvoice} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none professional-card">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#ff5a00] rounded-none flex items-center justify-center shadow-lg shadow-orange-950/20">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white heading-font uppercase italic">Invoice Manager</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sistem Penagihan Terpadu</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setFormData({
              customerName: '',
              phoneNumber: '',
              company: '',
              address: '',
              package: 'Custom',
              invoiceNumber: `CSTM${(invoices.length + 1).toString().padStart(3, '0')}`,
              invoiceDate: new Date().toISOString().split('T')[0],
              purchaseDate: new Date().toISOString().split('T')[0],
              jobStatus: 'ON PROSES',
              items: [{ id: '1', description: '', quantity: '', amount: 0 }],
              subtotal: 0,
              paymentAmount: 0,
              ppn: 0,
              accountNo: '2230974643',
              accountName: 'PT. GHANIY RIZKY INC',
              bankName: 'BCA',
              isPaid: true
            });
            setSelectedInvoice(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-white text-black font-black text-[11px] uppercase tracking-widest px-10 py-5 rounded-none hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>BUAT INVOICE BARU</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {invoices.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-black/40 border border-white/10 rounded-none backdrop-blur-sm">
            <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Database invoice masih kosong.</p>
          </div>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none hover:border-[#ff5a00]/30 transition-all group relative overflow-hidden professional-card">
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(inv.id)} className="p-2 text-zinc-500 hover:text-[#ff5a00] hover:bg-[#ff5a00]/5 rounded-none"><Trash2 className="w-4 h-4" /></button>
               </div>
               <div className="flex items-start justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#ff5a00] tracking-widest uppercase mb-1">{inv.invoiceNumber}</span>
                    <h4 className="text-base font-black text-white truncate max-w-[160px] heading-font uppercase">{inv.customerName}</h4>
                  </div>
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-none border ${inv.isPaid ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                    {inv.isPaid ? 'LUNAS' : 'PENDING'}
                  </span>
               </div>
               <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Tanggal:</span>
                    <span className="text-zinc-300">{new Date(inv.invoiceDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Total Nilai:</span>
                    <span className="text-white font-black">Rp {inv.subtotal.toLocaleString('id-ID')}</span>
                  </div>
               </div>
               <button 
                onClick={() => setViewingInvoice(inv)}
                className="w-full bg-white/5 hover:bg-[#ff5a00] text-zinc-400 hover:text-white transition-all py-3.5 rounded-none text-[10px] font-black uppercase tracking-widest"
               >
                 Tampilkan Invoice
               </button>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
          <div className="w-full max-w-4xl bg-black/80 border border-white/10 rounded-none overflow-hidden shadow-2xl my-auto professional-card">
            <div className="flex items-center justify-between p-10 border-b border-white/10 bg-black/50">
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-white heading-font uppercase italic">Invoice Editor</h3>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Konfigurasi Penagihan Digital</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/5 rounded-none transition-all text-zinc-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">IDENTITAS CLIENT</h4>
                  <div className="space-y-4">
                    <Input label="Nama Lengkap Client" value={formData.customerName} onChange={(val) => setFormData({...formData, customerName: val})} />
                    <Input label="Kontak WhatsApp" value={formData.phoneNumber} onChange={(val) => setFormData({...formData, phoneNumber: val})} />
                    <Input label="Nama Perusahaan" value={formData.company} onChange={(val) => setFormData({...formData, company: val})} />
                    <Input label="Alamat Domisili" value={formData.address} onChange={(val) => setFormData({...formData, address: val})} />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">DETAIL REFERENSI</h4>
                  <div className="space-y-4">
                    <Input label="Kode Invoice" value={formData.invoiceNumber} onChange={(val) => setFormData({...formData, invoiceNumber: val})} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Tgl Invoice" type="date" value={formData.invoiceDate} onChange={(val) => setFormData({...formData, invoiceDate: val})} />
                      <Input label="Tgl Pesanan" type="date" value={formData.purchaseDate} onChange={(val) => setFormData({...formData, purchaseDate: val})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Status" value={formData.jobStatus} onChange={(val) => setFormData({...formData, jobStatus: val})} />
                      <Input label="Kategori" value={formData.package} onChange={(val) => setFormData({...formData, package: val})} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">RINCIAN DESKRIPSI</h4>
                  <button onClick={handleAddItem} className="text-white bg-[#ff5a00] px-5 py-2.5 rounded-none text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#e65100] transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Tambah Baris</span>
                  </button>
                </div>
                <div className="bg-black/50 border border-white/10 overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                        <tr>
                          <th className="px-6 py-4">Deskripsi Layanan</th>
                          <th className="px-6 py-4 w-32">Qty</th>
                          <th className="px-6 py-4 w-44 text-right">Harga Satuan</th>
                          <th className="px-6 py-4 w-16"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {formData.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              <input 
                                className="w-full px-2 py-1 bg-transparent border-none focus:ring-0 text-sm font-bold uppercase text-zinc-300" 
                                placeholder="LAYANAN" 
                                value={item.description}
                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                className="w-full px-2 py-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-center text-zinc-300" 
                                placeholder="1" 
                                value={item.quantity}
                                onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                type="number"
                                className="w-full px-2 py-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-right text-zinc-300" 
                                placeholder="0" 
                                value={item.amount || ''}
                                onChange={(e) => handleItemChange(item.id, 'amount', Number(e.target.value))}
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button onClick={() => handleRemoveItem(item.id)} className="text-zinc-500 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">DATA REKENING</h4>
                  <div className="space-y-4">
                    <Input label="No Rekening" value={formData.accountNo} onChange={(val) => setFormData({...formData, accountNo: val})} />
                    <Input label="Nama Pemilik" value={formData.accountName} onChange={(val) => setFormData({...formData, accountName: val})} />
                    <Input label="Provider Bank" value={formData.bankName} onChange={(val) => setFormData({...formData, bankName: val})} />
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-[#ff5a00] uppercase tracking-widest border-l-2 border-[#ff5a00] pl-4">KALKULASI AKHIR</h4>
                  <div className="space-y-4">
                    <Input label="Total Diterima" type="number" value={formData.paymentAmount} onChange={(val) => setFormData({...formData, paymentAmount: Number(val)})} />
                    <div className="flex items-center gap-4 pt-6 bg-black/40 p-6 rounded-none border border-white/10">
                      <div className="flex-1">
                        <label className="text-[10px] font-black text-white block uppercase tracking-widest">Status Pelunasan</label>
                        <p className="text-[9px] text-zinc-500 uppercase mt-1">Status tercetak di invoice</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, isPaid: !formData.isPaid})}
                        className={`w-14 h-8 rounded-full p-1.5 transition-colors relative ${formData.isPaid ? 'bg-emerald-600' : 'bg-zinc-800'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${formData.isPaid ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-black/80 border-t border-white/10 flex justify-end">
               <button 
                onClick={handleSave}
                className="bg-[#ff5a00] hover:bg-[#e65100] text-white font-black uppercase tracking-widest py-5 px-14 rounded-none shadow-xl shadow-orange-950/20 transition-all flex items-center gap-3 active:scale-[0.98]"
               >
                 <Check className="w-5 h-5" />
                 <span>SIMPAN DATA INVOICE</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-5 py-4 text-sm font-bold uppercase tracking-tight bg-black/50 border border-white/10 focus:border-[#ff5a00]"
    />
  </div>
);

export default InvoiceManager;
