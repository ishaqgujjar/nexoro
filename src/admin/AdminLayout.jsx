import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import Toasts from '../components/Toasts';

const ICONS = {
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  products: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4',
  orders: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  messages: 'M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 01-8 8 9 9 0 01-4-1L3 21l1.5-4.5A8 8 0 0121 12z',
  wholesale: 'M3 3h18v4H3V3zm2 4v14h14V7M9 11h6',
  reviews: 'M11.05 3.69l1.6 3.24 3.58.52-2.59 2.52.61 3.56-3.2-1.68-3.2 1.68.61-3.56L5.86 7.45l3.58-.52 1.6-3.24z',
  testimonials: 'M7 8h10M7 12h6m-6 8l-3-3H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-5l-3 3z',
  categories: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z',
};

function Icon({ d }) {
  return <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>;
}

export default function AdminLayout() {
  const { orders, messages, wholesale, reviews, logout } = useStore();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const nav = [
    ['Dashboard', '/admin', ICONS.dashboard, null],
    ['Products', '/admin/products', ICONS.products, null],
    ['Orders', '/admin/orders', ICONS.orders, orders.length],
    ['Messages', '/admin/messages', ICONS.messages, messages.filter((m) => !m.isRead).length],
    ['Wholesale', '/admin/wholesale', ICONS.wholesale, wholesale.filter((w) => !w.isReviewed).length],
    ['Reviews', '/admin/reviews', ICONS.reviews, reviews.filter((r) => !r.isApproved).length],
    ['Testimonials', '/admin/testimonials', ICONS.testimonials, null],
    ['Categories', '/admin/categories', ICONS.categories, null],
  ];

  const title = nav.find(([, p]) => p === location.pathname)?.[0]
    || (location.pathname.includes('/products/') ? 'Products' : 'Dashboard');

  return (
    <div className="min-h-screen bg-cream font-sans text-ink flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-64 bg-ink text-stone-300 flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-6 py-6 border-b border-white/10">
          <Link to="/admin"><img src="/nexoro_logo.png" alt="NEXORO" className="h-8" /></Link>
          <p className="text-stone-500 text-[10px] tracking-[.32em] uppercase mt-2">Control Center</p>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {nav.map(([label, to, d, badge]) => (
            <NavLink key={to} to={to} end={to === '/admin'} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${isActive ? 'bg-gradient-to-r from-gold/90 to-gold text-ink font-semibold' : 'hover:bg-white/5 hover:text-white'}`}>
              <Icon d={d} /><span className="flex-1">{label}</span>
              {badge > 0 && <span className="text-[11px] bg-accent text-ink font-bold rounded-full px-2 py-0.5">{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/5 hover:text-white transition">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m-7 7h18" /></svg>
            View store
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/5 hover:text-white transition">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign out
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-cream/85 backdrop-blur border-b border-line px-5 sm:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setOpen(true)} className="lg:hidden text-ink" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <div>
            <h1 className="font-display text-2xl text-ink leading-none">{title}</h1>
            <p className="text-body text-xs mt-1">NEXORO admin</p>
          </div>
        </header>
        <Toasts />
        <div className="p-5 sm:p-8"><Outlet /></div>
      </div>
    </div>
  );
}
