import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { products, categories } = useStore();
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get('category') || '';
  const query = params.get('q') || '';
  const sort = params.get('sort') || '';
  const [search, setSearch] = useState(query);

  const setParam = (key, val) => {
    const next = new URLSearchParams(params);
    if (val) next.set(key, val); else next.delete(key);
    setParams(next);
  };

  const filtered = useMemo(() => {
    let qs = products.filter((p) => p.isActive);
    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      qs = qs.filter((p) => p.categoryId === cat?.id);
    }
    if (query) {
      const q = query.toLowerCase();
      qs = qs.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === 'price_low') qs = [...qs].sort((a, b) => a.price - b.price);
    else if (sort === 'price_high') qs = [...qs].sort((a, b) => b.price - a.price);
    return qs;
  }, [products, categories, activeCategory, query, sort]);

  return (
    <>
      <section className="pt-[74px] mesh">
        <div className="relative overflow-hidden">
          <div className="glow soft w-[420px] h-[420px] -top-10 left-1/3" />
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10 text-center relative">
            <p className="reveal text-xs tracking-[.4em] uppercase text-deep mb-5">The Collection</p>
            <h1 className="reveal font-display text-5xl sm:text-6xl text-ink">Shop <span className="gold-text">NEXORO</span></h1>
            <p className="reveal text-body mt-5 max-w-xl mx-auto">Innovative, practical, beautifully made — every product chosen to improve your everyday.</p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-8">
        <div className="reveal flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between bg-white border border-line rounded-2xl p-4 card-soft">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setParam('category', '')} className={`px-4 py-2 rounded-full text-sm border transition ${!activeCategory ? 'btn-gold border-transparent' : 'border-line text-body hover:border-gold hover:text-gold bg-white'}`}>All</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setParam('category', c.slug)} className={`px-4 py-2 rounded-full text-sm border transition ${activeCategory === c.slug ? 'btn-gold border-transparent' : 'border-line text-body hover:border-gold hover:text-gold bg-white'}`}>{c.name}</button>
            ))}
          </div>
          <div className="flex gap-3">
            <form onSubmit={(e) => { e.preventDefault(); setParam('q', search); }} className="relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…"
                className="bg-cream border border-line rounded-full pl-10 pr-4 py-2.5 text-sm text-ink placeholder-stone-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition w-full sm:w-56" />
              <svg className="w-4 h-4 absolute left-3.5 top-3 text-body" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4-4" /></svg>
            </form>
            <select value={sort} onChange={(e) => setParam('sort', e.target.value)} className="bg-cream border border-line rounded-full px-4 py-2.5 text-sm text-body focus:outline-none focus:border-gold transition">
              <option value="">Sort</option>
              <option value="price_low">Price: Low → High</option>
              <option value="price_high">Price: High → Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-10">
        {filtered.length ? (
          <>
            <div className="mb-6 text-sm text-body reveal">{filtered.length} product{filtered.length === 1 ? '' : 's'}{activeCategory ? ' in this category' : ''}{query ? ` for “${query}”` : ''}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-24 border border-line rounded-2xl bg-cream">
            <p className="font-display text-2xl text-ink">No products found</p>
            <p className="text-body mt-2 text-sm">Try a different category or search term.</p>
            <button onClick={() => setParams({})} className="btn-outline inline-block rounded-full px-6 py-2.5 mt-6 text-sm">Reset filters</button>
          </div>
        )}
      </section>
    </>
  );
}
