import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money, fmtDate } from '../lib/format';
import { placeholder } from '../lib/placeholder';
import ProductCard from '../components/ProductCard';
import Stars from '../components/Stars';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const { productBySlug, categoryById, approvedReviews, avgRating, reviewCount, discountPercent, addToCart, addReview, products, toast } = store;
  const product = productBySlug(slug);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [errors, setErrors] = useState({});

  if (!product) {
    return (
      <section className="pt-[140px] pb-28 max-w-2xl mx-auto px-5 text-center">
        <h1 className="font-display text-4xl text-ink">Product not found</h1>
        <Link to="/products" className="btn-gold inline-block rounded-full px-8 py-3.5 mt-8 text-sm">Back to products</Link>
      </section>
    );
  }

  const cat = categoryById[product.categoryId];
  const reviews = approvedReviews(product.id);
  const rc = reviewCount(product.id);
  const inStock = product.stock > 0;
  const disc = discountPercent(product);
  const img = product.image || placeholder(product.name, 0);
  const related = products.filter((p) => p.isActive && p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  const onAdd = () => { addToCart(product, qty); toast(`Added “${product.name}” to your cart.`); navigate('/cart'); };
  const submitReview = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'This field is required.';
    if (!form.comment.trim()) er.comment = 'This field is required.';
    setErrors(er);
    if (Object.keys(er).length) return;
    addReview(product.id, form);
    setForm({ name: '', rating: 5, comment: '' });
    toast('Thank you — your review has been posted.');
  };

  return (
    <>
      <section className="pt-[110px] pb-8 max-w-7xl mx-auto px-5 sm:px-8">
        <nav className="text-xs text-body mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-gold">Home</Link><span className="text-line">/</span>
          <Link to="/products" className="hover:text-gold">Products</Link><span className="text-line">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Image */}
          <div className="reveal lg:sticky lg:top-24">
            <div className="relative rounded-3xl overflow-hidden border border-line bg-cream p-3 card-soft">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-white">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
                {disc > 0 && <span className="absolute top-4 left-4 bg-gradient-to-br from-accent to-gold text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-gold">−{disc}% OFF</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[['⛨', 'Secure payment'], ['⟡', 'Quality checked'], ['↻', 'Support 24/7']].map(([i, t]) => (
                <div key={t} className="border border-line rounded-xl py-3 text-center bg-white card-soft"><div className="text-gold text-lg">{i}</div><div className="text-[11px] text-body mt-0.5">{t}</div></div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="reveal">
            {cat && <p className="text-xs tracking-[.3em] uppercase text-deep mb-3">{cat.name}</p>}
            <h1 className="font-display text-4xl sm:text-5xl leading-tight text-ink">{product.name}</h1>
            {product.tagline && <p className="text-body mt-3 text-lg">{product.tagline}</p>}
            {rc > 0 && (
              <div className="flex items-center gap-2 mt-4 text-sm">
                <Stars value={avgRating(product.id)} /><span className="text-body">{avgRating(product.id)} · {rc} review{rc === 1 ? '' : 's'}</span>
              </div>
            )}
            <div className="flex items-end gap-3 mt-7">
              <span className="font-display text-4xl gold-text">{money(product.price)}</span>
              {product.compareAtPrice && <span className="text-body/60 text-xl line-through mb-1">{money(product.compareAtPrice)}</span>}
            </div>
            <p className={`mt-3 inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full ${inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {inStock ? 'In stock — ready to ship' : 'Currently sold out'}
            </p>
            <div className="hairline my-8" />
            <p className="text-body leading-relaxed whitespace-pre-line">{product.description}</p>

            {inStock ? (
              <>
                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-line rounded-full overflow-hidden bg-white card-soft">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-body hover:text-gold transition text-lg">−</button>
                    <input value={qty} min="1" max={product.stock} onChange={(e) => setQty(Math.max(1, Math.min(product.stock, parseInt(e.target.value || '1'))))} type="number" className="w-14 text-center bg-transparent text-ink focus:outline-none no-spin" />
                    <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="px-4 py-3 text-body hover:text-gold transition text-lg">+</button>
                  </div>
                  <button onClick={onAdd} className="btn-gold rounded-full px-8 py-3.5 text-sm flex-1">Add to Cart</button>
                </div>
                <p className="text-xs text-body/80 mt-4">Free quality check · Manual bank transfer at checkout · {product.stock} available</p>
              </>
            ) : (
              <button disabled className="mt-9 w-full sm:w-auto bg-cream text-body border border-line rounded-full px-8 py-3.5 text-sm cursor-not-allowed">Sold Out</button>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-cream border-y border-line mt-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[.3em] uppercase text-deep mb-2">Reviews</p>
              <h2 className="font-display text-3xl text-ink">What buyers say</h2>
              {rc > 0 ? (
                <div className="mt-6 flex items-center gap-4 bg-white border border-line rounded-2xl p-5 card-soft">
                  <span className="font-display text-5xl gold-text leading-none">{avgRating(product.id)}</span>
                  <div><Stars value={avgRating(product.id)} className="text-lg" /><p className="text-body text-xs mt-1">Based on {rc} review{rc === 1 ? '' : 's'}</p></div>
                </div>
              ) : <p className="text-body mt-3 text-sm">No reviews yet — be the first to share your experience.</p>}

              <div className="reveal mt-6 bg-white border border-line rounded-2xl p-6 card-soft">
                <h3 className="font-medium mb-4 text-ink">Write a review</h3>
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <input className="field" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <select className="field" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                  </select>
                  <div>
                    <textarea className="field" placeholder="Share your experience with this product…" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
                    {errors.comment && <p className="text-red-600 text-xs mt-1">{errors.comment}</p>}
                  </div>
                  <button className="btn-gold rounded-full px-7 py-3 text-sm w-full">Submit Review</button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-5">
              {reviews.length ? reviews.map((r) => (
                <div key={r.id} className="reveal bg-white border border-line rounded-2xl p-6 card-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-gold text-ink font-bold flex items-center justify-center text-sm">{r.name[0]?.toUpperCase()}</div>
                      <div><div className="text-sm font-medium text-ink">{r.name}</div><div className="text-xs text-body">{fmtDate(r.createdAt)}</div></div>
                    </div>
                    <Stars value={r.rating} className="text-sm" />
                  </div>
                  <p className="text-body mt-4 leading-relaxed text-[15px]">{r.comment}</p>
                </div>
              )) : <div className="border border-line rounded-2xl p-10 text-center text-body bg-white">Your review could be the first one here.</div>}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <h2 className="font-display text-3xl mb-10 reveal text-ink">You may also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
}
