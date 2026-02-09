
import React, { useState, useEffect } from 'react';
import { Lock, User as UserIcon, LogIn, ShieldAlert } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem('gr_users');
    if (!savedUsers) {
      const initialAdmin: User = {
        id: 'admin-1',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('gr_users', JSON.stringify([initialAdmin]));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const savedUsers: User[] = JSON.parse(localStorage.getItem('gr_users') || '[]');
      const user = savedUsers.find(u => u.username === username && u.password === password);

      if (user) {
        onLoginSuccess(user);
      } else {
        setError('Akses ditolak. Silakan periksa kredensial Anda.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-['Inter'] relative overflow-hidden bg-black">
      {/* --- ANIMATED BACKGROUND START --- */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
      `}</style>
      
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Animated Glowing Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#cc0000] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-[#ff5a00] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#990000] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Digital Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Vignette & Noise Texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </div>
      {/* --- ANIMATED BACKGROUND END --- */}

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Logo Brand */}
            <div className="flex items-center gap-4 mb-10 group cursor-default">
              <div className="w-20 h-20 bg-[#cc0000] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(204,0,0,0.6)] transition-all duration-500 group-hover:scale-105 border-2 border-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                 <span className="text-white font-black italic text-3xl relative z-10">GR</span>
              </div>
              <div className="flex flex-col items-start">
                <div className="text-white font-black text-4xl italic tracking-tighter leading-none drop-shadow-lg">
                  GR DESAIN
                </div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.4em] mt-2">whatever you want</span>
              </div>
            </div>
            
            <p className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.4em]">Secure Terminal Access</p>
        </div>

        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-10 rounded-none shadow-2xl professional-card relative group animate-in zoom-in-95 duration-500">
          {/* subtle hover glow line */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#cc0000] group-hover:w-full transition-all duration-700"></div>
          
          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-5 flex items-center gap-4 text-rose-500 text-xs font-black uppercase tracking-widest animate-in slide-in-from-top-2">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">KREDENSIAL ID</label>
              <div className="relative group/input">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within/input:text-[#ff5a00] transition-colors" />
                <input
                  type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 text-sm font-black uppercase tracking-widest bg-black/40 border border-white/5 text-white outline-none focus:border-[#cc0000] focus:bg-black/60 transition-all placeholder:text-zinc-700"
                  placeholder="USERNAME"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">OTORISASI KUNCI</label>
              <div className="relative group/input">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within/input:text-[#ff5a00] transition-colors" />
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 text-sm font-black uppercase tracking-widest bg-black/40 border border-white/5 text-white outline-none focus:border-[#cc0000] focus:bg-black/60 transition-all placeholder:text-zinc-700"
                  placeholder="PASSWORD"
                />
              </div>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#cc0000] to-[#990000] hover:from-[#ff0000] hover:to-[#cc0000] text-white font-black py-5 rounded-none transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50 shadow-[0_0_20px_rgba(204,0,0,0.3)] hover:shadow-[0_0_30px_rgba(204,0,0,0.5)] uppercase tracking-[0.3em] text-xs border border-white/5"
            >
              {isLoading ? <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>AUTHORIZE ACCESS</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-12 flex flex-col items-center space-y-6 animate-in fade-in duration-1000 delay-300">
          <div className="h-px w-20 bg-white/10"></div>
          <p className="text-center text-zinc-600 text-[9px] font-black uppercase tracking-[0.6em] hover:text-[#ff5a00] transition-colors cursor-default">
            © 2025 GR FINANCE SYSTEM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
