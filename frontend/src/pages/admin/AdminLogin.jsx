import React, { useState } from 'react';
import { API_URL } from '../../config';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection to security server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C] px-6 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#131316]/75 backdrop-blur-xl border border-white/[0.06] p-10 rounded-lg shadow-2xl gold-glow animate-butter-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/25 rounded-full flex items-center justify-center text-amber-400 mb-4">
            <Lock size={24} />
          </div>
          <h2 className="text-3xl font-serif text-center font-bold text-white">Staff Portal</h2>
          <p className="text-xs text-bw-light/40 uppercase tracking-widest mt-1.5">Luminos Studio CMS</p>
        </div>
        
        {error && (
          <div className="bg-red-900/15 border border-red-500/30 text-red-400 p-4 mb-6 text-sm rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium flex items-center gap-1.5">
              <Mail size={13} className="text-amber-500" /> Email Address
            </label>
            <input 
              type="email" 
              className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="admin@luminosstudio.com"
              required 
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium flex items-center gap-1.5">
              <Lock size={13} className="text-amber-500" /> Password
            </label>
            <input 
              type="password" 
              className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary mt-8 py-3.5 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Authenticating...
              </>
            ) : (
              <>
                Secure Login
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
