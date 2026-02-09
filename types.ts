
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  note: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  photo?: string;
  createdAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: string;
  amount: number;
}

export interface Invoice {
  id: string;
  customerName: string;
  phoneNumber: string;
  company: string;
  address: string;
  package: string;
  invoiceNumber: string;
  invoiceDate: string;
  purchaseDate: string;
  jobStatus: string;
  items: InvoiceItem[];
  subtotal: number;
  paymentAmount: number;
  ppn: number;
  accountNo: string;
  accountName: string;
  bankName: string;
  isPaid: boolean;
  createdAt: string;
}

export interface DesignBrief {
  id: string;
  status: {
    prosesDesign: boolean;
    preview: boolean;
    revisi: boolean;
    finish: boolean;
    bonus: boolean;
  };
  namaLogo: string;
  slogan: string;
  jenisUsaha: string;
  deadline: string;
  pemilihanPaket: 'UMKM' | 'STANDAR' | 'GOLD' | 'PLATINUM';
  lunasAmount: string;
  jenisLogo: string;
  dominanColor: string;
  kebutuhanLogo: string[];
  konsepDetail: string;
  clientColor: string;
  catatan: string;
  sliders: {
    style: number; // Flat (0) to Gradient (10)
    practical: number; // Practical (0) to Luxury (10)
    abstract: number; // Abstract (0) to Elegant (10)
    retro: number; // Retro (0) to Modern (10)
    funny: number; // Funny (0) to Serious (10)
    basic: number; // Basic (0) to Script (10)
  };
  referensi: string[]; // base64 strings
  pembuatBrief: string;
  createdAt: string;
}
