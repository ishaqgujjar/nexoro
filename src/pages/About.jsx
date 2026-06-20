import { Link } from 'react-router-dom';

const offers = [
  ['01', 'Home Organization', 'Smart products that bring order to every room.'],
  ['02', 'Fitness & Wellness', 'Tools to support a healthier daily routine.'],
  ['03', 'Lifestyle Accessories', 'Refined pieces for the modern everyday.'],
  ['04', 'Innovative Daily Use', 'Clever solutions to common problems.'],
  ['05', 'Storage & Space-Saving', 'Make the most of every inch you have.'],
  ['06', 'Modern Household', 'Everyday essentials, thoughtfully chosen.'],
];
const values = [
  ['01', 'Quality First', 'Quality sits at the center of everything we do — performance, durability, reliability.'],
  ['02', 'Customer Satisfaction', 'Our customers are our highest priority, from first visit to delivery and beyond.'],
  ['03', 'Innovation', 'We actively seek practical products that solve common problems and create value.'],
  ['04', 'Trust & Transparency', 'Honest business practices, clear communication, and long-term relationships.'],
  ['05', 'Continuous Improvement', 'We constantly evaluate our products, service, and feedback to grow and improve.'],
];
const reasons = ['Carefully selected products', 'Focus on quality & reliability', 'Practical everyday solutions', 'Competitive pricing', 'Secure shopping experience', 'Responsive customer support', 'Customer-centered approach', 'Commitment to long-term satisfaction'];

export default function About() {
  return (
    <>
      <section className="relative pt-[74px] overflow-hidden mesh">
        <div className="glow soft w-[460px] h-[460px] -top-10 right-0" />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-24 pb-16 text-center relative">
          <p className="reveal text-xs tracking-[.4em] uppercase text-deep mb-6">About the Brand</p>
          <h1 className="reveal font-display text-5xl sm:text-7xl leading-tight text-ink">Welcome to <span className="gold-text shimmer">NEXORO</span></h1>
          <p className="reveal text-body mt-7 text-lg leading-relaxed">A modern e-commerce brand dedicated to innovative, practical, and high-quality products that make everyday life easier, more organized, and more enjoyable.</p>
        </div>
      </section>

      <div className="hairline max-w-4xl mx-auto" />

      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-20 space-y-6 text-body leading-relaxed reveal">
        <p>Our goal is not simply to sell products. We aim to offer carefully selected solutions that solve real-life problems and add value to our customers' daily lives. Every product we choose is evaluated on quality, usefulness, reliability, and customer satisfaction.</p>
        <p>We believe customers deserve products that are functional, durable, and reasonably priced. That is why we continuously research market trends and customer needs to bring innovative products that improve everyday experiences.</p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-6">
        <div className="reveal lift bg-white border border-line rounded-2xl p-9 card-soft">
          <p className="text-xs tracking-[.3em] uppercase text-deep mb-4">Our Mission</p>
          <p className="text-body leading-relaxed">To provide high-quality, practical products that help people live better, stay organized, improve their routines, and enjoy greater convenience — delivered through carefully selected products, excellent service, and a trustworthy shopping experience.</p>
        </div>
        <div className="reveal lift bg-white border border-line rounded-2xl p-9 card-soft">
          <p className="text-xs tracking-[.3em] uppercase text-deep mb-4">Our Vision</p>
          <p className="text-body leading-relaxed">To become a trusted international brand recognized for innovation, quality, reliability, and customer satisfaction — building long-term relationships by consistently offering products that solve everyday challenges and improve quality of life.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
        <div className="reveal text-center mb-14">
          <p className="text-xs tracking-[.3em] uppercase text-deep mb-3">What We Offer</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Innovation, functionality, value.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map(([n, t, d]) => (
            <div key={n} className="reveal lift bg-white border border-line rounded-xl p-6 card-soft"><span className="text-gold font-display text-xl">{n}</span><h4 className="font-display text-lg mt-2">{t}</h4><p className="text-body text-sm mt-2">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24">
          <div className="reveal text-center mb-16">
            <p className="text-xs tracking-[.3em] uppercase text-deep mb-3">Our Core Values</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink">What guides every decision</h2>
          </div>
          <div className="space-y-px">
            {values.map(([n, t, d], i) => (
              <div key={n} className={`reveal flex gap-6 py-7 ${i < values.length - 1 ? 'border-b border-line' : ''}`}>
                <span className="font-display text-2xl gold-text w-10">{n}</span>
                <div><h4 className="font-medium text-lg text-ink">{t}</h4><p className="text-body mt-1">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-24">
        <div className="reveal text-center mb-14">
          <p className="text-xs tracking-[.3em] uppercase text-deep mb-3">Why Choose NEXORO?</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Shop with confidence</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 reveal">
          {reasons.map((r) => (
            <div key={r} className="flex items-center gap-3 bg-white border border-line rounded-lg px-5 py-4 card-soft"><span className="text-gold">✓</span><span className="text-body text-sm">{r}</span></div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-8">
        <div className="reveal relative overflow-hidden rounded-3xl bg-ink text-white p-12 sm:p-16 text-center">
          <div className="glow w-72 h-72 -top-16 left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle,rgba(212,175,55,.35),transparent 70%)' }} />
          <div className="relative">
            <p className="text-xs tracking-[.3em] uppercase text-accent mb-4">Our Commitment</p>
            <h2 className="font-display text-3xl sm:text-4xl leading-snug">Online shopping should be simple, reliable, and beneficial.</h2>
            <p className="text-stone-300 mt-6 leading-relaxed">We work hard to earn and maintain your trust — delivering quality products, excellent support, and an experience built on transparency and honesty. Thank you for visiting NEXORO. We look forward to serving you with innovative products and exceptional service for years to come.</p>
            <Link to="/products" className="btn-gold inline-block rounded-full px-8 py-3.5 mt-9 text-sm">Discover Our Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
