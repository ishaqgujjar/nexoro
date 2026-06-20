import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import ProductCard from '../components/ProductCard';
import Testimonial from '../components/Testimonial';

export default function Home() {
  const { products, testimonials } = useStore();
  const active = products.filter((p) => p.isActive);
  let featured = active.filter((p) => p.isFeatured).slice(0, 6);
  if (!featured.length) featured = active.slice(0, 6);
  const activeTestimonials = testimonials.filter((t) => t.isActive).slice(0, 8);
  const productCount = active.length;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-[74px] mesh">
        <div className="glow w-[520px] h-[520px] -top-24 -left-28" />
        <div className="glow soft w-[440px] h-[440px] bottom-0 right-0" style={{ animationDelay: '-7s' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 text-center">
          <p className="reveal inline-flex items-center gap-2 text-xs sm:text-sm tracking-[.4em] uppercase text-deep mb-7 bg-cream border border-line rounded-full px-5 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Premium Private-Label Brand
          </p>
          <h1 className="reveal font-display text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.03] font-bold text-ink">
            Everyday Essentials,<br />
            <span className="gold-text shimmer italic">Elevated.</span>
          </h1>
          <p className="reveal max-w-2xl mx-auto mt-8 text-body text-base sm:text-lg leading-relaxed">
            NEXORO curates innovative, high-quality products designed to make daily life
            simpler, more organized, and quietly refined — each one chosen for quality, built for trust.
          </p>
          <div className="reveal mt-11 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-gold rounded-full px-8 py-3.5 text-sm">Explore the Collection</Link>
            <Link to="/about" className="btn-outline rounded-full px-8 py-3.5 text-sm">Our Story</Link>
          </div>
          <div className="reveal mt-20 grid grid-cols-3 max-w-xl mx-auto divide-x divide-line">
            <div className="px-4"><div className="font-display text-3xl sm:text-4xl gold-text">{productCount}+</div><div className="text-xs text-body mt-1 tracking-wide">Curated Products</div></div>
            <div className="px-4"><div className="font-display text-3xl sm:text-4xl gold-text">100%</div><div className="text-xs text-body mt-1 tracking-wide">Quality Checked</div></div>
            <div className="px-4"><div className="font-display text-3xl sm:text-4xl gold-text">24/7</div><div className="text-xs text-body mt-1 tracking-wide">Customer Care</div></div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 5v14m0 0l-6-6m6 6l6-6" /></svg>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <p className="text-xs tracking-[.35em] uppercase text-deep mb-5">The NEXORO Standard</p>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight text-ink">Not just products — <span className="gold-text">considered solutions.</span></h2>
            <p className="text-body mt-6 leading-relaxed">
              We don't chase trends. Every item in our catalogue is evaluated on quality, usefulness,
              reliability, and the satisfaction it brings to the people who own it. The result is a
              collection that earns its place in your everyday.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-gold hover:text-deep transition group font-medium">
              Learn more about us <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              ['Quality First', 'High standards of performance and durability in everything we offer.'],
              ['Customer Obsessed', 'Responsive support and a genuinely positive shopping experience.'],
              ['Honest Pricing', 'Competitive prices with transparent, no-surprise checkout.'],
              ['Built to Last', 'Durable, reliable products selected to serve you for years.'],
            ].map(([t, d], i) => (
              <div key={t} className={`bg-white border border-line rounded-2xl p-6 lift card-soft ${i % 2 ? 'mt-6' : ''}`}>
                <div className="text-gold text-2xl mb-3">✦</div>
                <h4 className="font-display text-lg">{t}</h4>
                <p className="text-body text-sm mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="reveal flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[.35em] uppercase text-deep mb-3">Featured</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink">The Signature Selection</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex btn-outline rounded-full px-6 py-2.5 text-sm">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="mt-10 sm:hidden text-center">
          <Link to="/products" className="btn-outline rounded-full px-6 py-3 text-sm">View all products</Link>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-line bg-cream mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[['⟡', 'Curated Quality', 'Every product hand-selected'], ['⛨', 'Secure Checkout', 'Verified payment process'], ['↻', 'Reliable Support', 'Here whenever you need us'], ['✶', 'Trusted by Many', 'Loved by customers']].map(([ic, t, d]) => (
            <div key={t} className="reveal"><div className="text-gold text-3xl mb-2">{ic}</div><h4 className="font-medium text-ink">{t}</h4><p className="text-body text-xs mt-1">{d}</p></div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {activeTestimonials.length > 0 && (
        <section className="py-24 overflow-hidden bg-white">
          <div className="reveal text-center mb-14 px-5">
            <p className="text-xs tracking-[.35em] uppercase text-deep mb-3">In Their Words</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink">What our customers say</h2>
          </div>
          <div className="marquee-wrap relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex gap-6 w-max marquee">
              {[...activeTestimonials, ...activeTestimonials].map((t, i) => <Testimonial key={i} t={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl bg-ink text-white p-12 sm:p-16 text-center">
          <div className="glow w-80 h-80 -top-20 left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle,rgba(212,175,55,.35),transparent 70%)' }} />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl">Ready to upgrade your <span className="gold-text">everyday?</span></h2>
            <p className="text-stone-300 mt-5 max-w-xl mx-auto">Browse the full NEXORO collection and discover products designed to make life simpler and more refined.</p>
            <Link to="/products" className="btn-gold inline-block rounded-full px-9 py-4 mt-9 text-sm">Shop the Collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
