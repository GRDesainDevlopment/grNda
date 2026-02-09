
import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, Shield, Trash2, Key, User as UserIcon, ShieldCheck, Camera, X } from 'lucide-react';
import { User } from '../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('gr_users') || '[]');
    setUsers(savedUsers);
  }, []);

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('gr_users', JSON.stringify(updatedUsers));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // Max 1MB
        alert("Ukuran file terlalu besar. Maksimal 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;

    if (users.some(u => u.username === newUsername)) {
      alert('Username sudah ada!');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: newUsername,
      password: newPassword,
      role: 'user',
      photo: newPhoto || undefined,
      createdAt: new Date().toISOString()
    };

    saveUsers([...users, newUser]);
    setNewUsername('');
    setNewPassword('');
    setNewPhoto(null);
    setShowAddForm(false);
  };

  const handleDeleteUser = (id: string) => {
    if (id === 'admin-1') {
      alert('Akun admin utama tidak dapat dihapus!');
      return;
    }
    if (confirm('Hapus akses user ini?')) {
      saveUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none shadow-2xl professional-card">
        <div className="flex items-center space-x-5">
          <div className="p-4 bg-[#ff5a00] rounded-none shadow-lg shadow-orange-950/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter heading-font">Otoritas Akses</h2>
            <p className="text-[10px] text-[#ff5a00] font-black uppercase tracking-[0.3em] mt-1">Sistem Manajemen Kredensial</p>
          </div>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center space-x-2 bg-white text-black font-black text-[11px] uppercase tracking-widest px-10 py-5 rounded-none hover:bg-zinc-200 transition-all shadow-lg active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>{showAddForm ? 'Tutup Panel' : 'Tambah Akses User'}</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-black/60 backdrop-blur-xl border border-[#ff5a00]/30 p-10 rounded-none animate-in slide-in-from-top-4 duration-300 professional-card">
          <h3 className="text-xs font-black text-white italic uppercase tracking-widest mb-10 flex items-center">
            <UserPlus className="w-4 h-4 mr-3 text-[#ff5a00]" />
            Daftarkan Personel Baru
          </h3>
          <form onSubmit={handleAddUser} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-10">
              {/* PHOTO UPLOAD SECTION */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-none bg-black/50 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#ff5a00]">
                    {newPhoto ? (
                      <img src={newPhoto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-10 h-10 text-zinc-600 group-hover:text-[#ff5a00] transition-colors" />
                    )}
                  </div>
                  {newPhoto && (
                    <button 
                      type="button" 
                      onClick={() => setNewPhoto(null)}
                      className="absolute -top-2 -right-2 bg-rose-600 text-white p-1 rounded-none shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[9px] font-black text-[#ff5a00] uppercase tracking-[0.3em] hover:text-white transition-colors"
                >
                  Upload Foto Personel
                </button>
              </div>

              {/* INPUT SECTION */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Username Baru</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-6 py-4 text-sm font-black bg-black/50 border-white/10 text-white focus:border-[#ff5a00] outline-none transition-all uppercase tracking-tight"
                    placeholder="Ex: staf_gr_01"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Password Otorisasi</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-6 py-4 text-sm font-black bg-black/50 border-white/10 text-white focus:border-[#ff5a00] outline-none transition-all uppercase tracking-tight"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#ff5a00] hover:bg-[#e65100] text-white font-black uppercase tracking-widest py-4 px-12 rounded-none shadow-xl shadow-orange-950/20 transition-all active:scale-95 text-[11px]"
              >
                Konfirmasi Akses
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-none overflow-hidden shadow-2xl professional-card">
        <div className="p-8 border-b border-white/10 bg-black/20">
          <h3 className="text-sm font-black text-white italic uppercase tracking-widest heading-font">Daftar Pengguna Aktif</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/40 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Identitas Personel</th>
                <th className="px-8 py-5">Role / Otoritas</th>
                <th className="px-8 py-5">Tgl Bergabung</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      {u.photo ? (
                        <img src={u.photo} alt={u.username} className="w-10 h-10 rounded-none object-cover border border-white/10 group-hover:border-[#ff5a00]/50 transition-colors" />
                      ) : (
                        <div className="w-10 h-10 rounded-none bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-[#ff5a00]/50 transition-colors">
                          <UserIcon className="w-5 h-5 text-zinc-600 group-hover:text-[#ff5a00]" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase tracking-tighter">{u.username}</span>
                        <span className="text-[9px] text-zinc-600 font-bold tracking-widest">ID: {u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-none uppercase tracking-widest border ${u.role === 'admin' ? 'bg-[#ff5a00] text-white border-[#e65100]' : 'bg-black/50 text-zinc-500 border-white/10'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[11px] text-zinc-500 font-bold uppercase tracking-tight">
                    {new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button 
                      onClick={() => handleDeleteUser(u.id)}
                      className={`p-3 rounded-none transition-all ${u.id === 'admin-1' ? 'opacity-20 cursor-not-allowed' : 'text-zinc-500 hover:bg-rose-600/10 hover:text-rose-500'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
