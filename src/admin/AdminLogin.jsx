import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';

export default function AdminLogin() {
  const { login } = useStore();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!login(pw)) setErr('Incorrect password. Try again.');
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-5 font-sans">
      <div className="absolute inset-0 mesh opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/nexoro_logo.png" alt="NEXORO" className="h-10 mx-auto" />
          <p className="text-stone-400 text-xs tracking-[.32em] uppercase mt-3">Control Center</p>
        </div>
        <form onSubmit={submit} className="bg-[#221d18] border border-[#3a322a] rounded-2xl p-8 shadow-2xl">
          <h1 className="font-display text-2xl text-white mb-1">Sign in</h1>
          <p className="text-stone-400 text-sm mb-6">Enter the admin password to manage your store.</p>
          <label className="text-xs text-stone-400 mb-1.5 block">Password</label>
          <input type="password" autoFocus value={pw} onChange={(e) => { setPw(e.target.value); setErr(''); }}
            className="w-full bg-[#1a1613] border border-[#3a322a] rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition"
            placeholder="••••••••" />
          {err && <p className="text-red-400 text-xs mt-2">{err}</p>}
          <button className="btn-gold w-full rounded-full px-6 py-3.5 text-sm mt-6">Enter Dashboard</button>
          <p className="text-stone-500 text-[11px] mt-4 text-center">Demo password: <span className="text-stone-300 font-mono">admin12345</span></p>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-stone-400 hover:text-accent text-sm transition">← Back to store</Link>
        </div>
      </div>
    </div>
  );
}
