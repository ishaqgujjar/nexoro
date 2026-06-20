import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../store/StoreContext';

const links = [
  ['Home', '/'], ['Products', '/products'], ['About', '/about'], ['Contact', '/contact'],
];

export default function Navbar() {
  const { cartCount } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header id="nav" className={`fixed top-0 inset-x-0 z-50 border-b border-transparent ${scrolled ? 'scrolled' : ''}`}>
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[74px] flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img src="/nexoro_logo_dark.png" alt="NEXORO" draggable="false"
               className="h-[30px] sm:h-[34px] w-auto select-none transition-transform duration-300 group-hover:scale-[1.03]" />
        </Link>

        <div className="hidden md:flex items-center gap-9 text-sm tracking-wide text-body">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => `nav-link hover:text-ink ${isActive ? 'active text-ink' : ''}`}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative btn-outline rounded-full px-4 py-2 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.4l.7 12.6a2 2 0 002 1.9h9.6a2 2 0 002-1.7l1.2-7.8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-gradient-to-br from-accent to-gold text-ink text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-gold">{cartCount}</span>}
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="md:hidden text-ink p-2" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-white/95 backdrop-blur-lg">
          <div className="px-5 py-4 flex flex-col gap-4 text-body">
            {links.map(([label, to]) => (
              <Link key={to} to={to} className="hover:text-gold">{label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
