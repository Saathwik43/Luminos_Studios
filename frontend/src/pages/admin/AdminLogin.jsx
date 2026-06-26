import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server connection failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bw-black px-6">
      <div className="w-full max-w-md bg-bw-dark p-10 border border-bw-gray">
        <h2 className="text-3xl font-serif text-center mb-8">Staff Portal</h2>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="w-full btn-primary mt-8">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
