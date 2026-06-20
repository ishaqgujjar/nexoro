import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { BRAND } from '../lib/constants';

export default function Contact() {
  const { addMessage, toast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'This field is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid email address.';
    if (!form.message.trim()) er.message = 'This field is required.';
    setErrors(er);
    if (Object.keys(er).length) return;
    addMessage(form);
    setForm({ name: '', email: '', subject: '', message: '' });
    toast('Message sent. Our team will reply to your email shortly.');
  };

  return (
    <section className="pt-[110px] pb-24 max-w-6xl mx-auto px-5 sm:px-8">
      <div className="text-center mb-16 relative">
        <div className="glow soft w-80 h-80 -top-16 left-1/2 -translate-x-1/2" />
        <div className="relative">
          <p className="reveal text-xs tracking-[.4em] uppercase text-deep mb-5">Get in Touch</p>
          <h1 className="reveal font-display text-5xl sm:text-6xl text-ink">We're here to <span className="gold-text">help</span></h1>
          <p className="reveal text-body mt-5 max-w-xl mx-auto">Questions about a product, an order, or your delivery? Send us a message and our team will reply to your email.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="reveal bg-white border border-line rounded-2xl p-8 card-soft lift">
            <div className="text-gold text-2xl mb-4">✉</div>
            <h3 className="font-display text-xl text-ink">Email us</h3>
            <p className="text-body text-sm mt-2">For product inquiries, order support, and general questions.</p>
            <a href={`mailto:${BRAND.email}`} className="inline-block text-gold hover:text-deep transition mt-4 font-medium">{BRAND.email}</a>
          </div>
          <div className="reveal bg-white border border-line rounded-2xl p-8 card-soft lift">
            <div className="text-gold text-2xl mb-4">⛁</div>
            <h3 className="font-display text-xl text-ink">Wholesale Program</h3>
            <p className="text-body text-sm mt-2">Buying in bulk or stocking NEXORO for your store? Apply to our wholesale program.</p>
            <Link to="/wholesale" className="inline-flex items-center gap-2 text-gold hover:text-deep transition mt-4 font-medium">Apply now →</Link>
          </div>
        </div>

        <div className="lg:col-span-3 reveal">
          <div className="bg-white border border-line rounded-2xl p-8 card-soft">
            <h3 className="font-display text-2xl mb-6 text-ink">Send a message</h3>
            <form onSubmit={submit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className="text-xs text-body mb-1.5 block">Name</label><input className="field" placeholder="Full name" value={form.name} onChange={set('name')} />{errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}</div>
                <div><label className="text-xs text-body mb-1.5 block">Email</label><input className="field" placeholder="you@email.com" value={form.email} onChange={set('email')} />{errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}</div>
              </div>
              <div><label className="text-xs text-body mb-1.5 block">Subject</label><input className="field" placeholder="How can we help?" value={form.subject} onChange={set('subject')} /></div>
              <div><label className="text-xs text-body mb-1.5 block">Message</label><textarea className="field" placeholder="Write your message…" value={form.message} onChange={set('message')} />{errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}</div>
              <button className="btn-gold rounded-full px-8 py-3.5 text-sm w-full sm:w-auto">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
