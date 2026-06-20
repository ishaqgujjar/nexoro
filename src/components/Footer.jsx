import { Link } from 'react-router-dom';
import { BRAND } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="relative mt-28 bg-ink text-stone-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src="/nexoro_logo.png" alt="NEXORO" className="h-9 w-auto" />
          <p className="text-stone-400 text-sm mt-4 leading-relaxed">Innovative products for everyday life — selected for quality, built for trust.</p>
        </div>
        <div>
          <h4 className="text-xs tracking-[.25em] text-accent uppercase mb-4">Explore</h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li><Link to="/" className="hover:text-accent transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-accent transition">Products</Link></li>
            <li><Link to="/about" className="hover:text-accent transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[.25em] text-accent uppercase mb-4">Business</h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li><Link to="/wholesale" className="hover:text-accent transition">Wholesale Program</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition">Customer Support</Link></li>
            <li><Link to="/cart" className="hover:text-accent transition">Your Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[.25em] text-accent uppercase mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-accent transition">{BRAND.email}</a></li>
            <li><a href={BRAND.website} className="hover:text-accent transition">{BRAND.website}</a></li>
          </ul>
        </div>
      </div>
      <div className="hairline max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} NEXORO. All rights reserved.</p>
        <p className="tracking-wide">Innovative Products for Everyday Life.</p>
      </div>
    </footer>
  );
}
