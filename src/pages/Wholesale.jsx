import { useState } from 'react';
import { useStore } from '../store/StoreContext';

export default function Wholesale() {
  const { addWholesale, toast } = useStore();
  const [form, setForm] = useState({ fullName: '', businessName: '', email: '', phone: '', country: '', monthlyVolume: '', message: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    ['fullName', 'businessName', 'phone', 'country'].forEach((f) => { if (!form[f].trim()) er[f] = 'This field is required.'; });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid email address.';
    setErrors(er);
    if (Object.keys(er).length) return;
    addWholesale(form);
    setForm({ fullName: '', businessName: '', email: '', phone: '', country: '', monthlyVolume: '', message: '' });
    toast('Application received. Our wholesale team will review and contact you soon.');
  };

  return (
    <section className="pt-[110px] pb-24 max-w-4xl mx-auto px-5 sm:px-8">
      <div className="text-center mb-14 relative">
        <div className="glow soft w-80 h-80 -top-16 left-1/2 -translate-x-1/2" />
        <div className="relative">
          <p className="reveal text-xs tracking-[.4em] uppercase text-deep mb-5">For Businesses</p>
          <h1 className="reveal font-display text-5xl sm:text-6xl text-ink">Wholesale <span className="gold-text">Program</span></h1>
          <p className="reveal text-body mt-5 max-w-xl mx-auto">Partner with NEXORO to stock premium, customer-loved products. Tell us about your business and our wholesale team will be in touch.</p>
        </div>
      </div>

      <div className="reveal grid sm:grid-cols-3 gap-4 mb-10">
        {[['⛁', 'Competitive bulk pricing'], ['⟡', 'Quality-checked stock'], ['↻', 'Dedicated support']].map(([i, t]) => (
          <div key={t} className="bg-white border border-line rounded-xl p-5 text-center card-soft"><div className="text-gold text-xl mb-2">{i}</div><p className="text-sm text-body">{t}</p></div>
        ))}
      </div>

      <div className="reveal bg-white border border-line rounded-2xl p-8 card-soft">
        <form onSubmit={submit} className="space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="text-xs text-body mb-1.5 block">Full name</label><input className="field" placeholder="Full name" value={form.fullName} onChange={set('fullName')} />{errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}</div>
            <div><label className="text-xs text-body mb-1.5 block">Business / store name</label><input className="field" placeholder="Business / store name" value={form.businessName} onChange={set('businessName')} />{errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName}</p>}</div>
            <div><label className="text-xs text-body mb-1.5 block">Email</label><input className="field" placeholder="business@email.com" value={form.email} onChange={set('email')} />{errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}</div>
            <div><label className="text-xs text-body mb-1.5 block">Phone</label><input className="field" placeholder="+92 300 0000000" value={form.phone} onChange={set('phone')} />{errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}</div>
            <div><label className="text-xs text-body mb-1.5 block">Country</label><input className="field" placeholder="Country" value={form.country} onChange={set('country')} />{errors.country && <p className="text-red-600 text-xs mt-1">{errors.country}</p>}</div>
            <div><label className="text-xs text-body mb-1.5 block">Est. monthly volume</label><input className="field" placeholder="e.g. 200–500 units / month" value={form.monthlyVolume} onChange={set('monthlyVolume')} /></div>
          </div>
          <div><label className="text-xs text-body mb-1.5 block">Message</label><textarea className="field" placeholder="Tell us about your business and needs…" value={form.message} onChange={set('message')} /></div>
          <button className="btn-gold rounded-full px-8 py-3.5 text-sm w-full sm:w-auto">Submit Application</button>
          <p className="text-xs text-body">Applications are reviewed privately by our team in the admin dashboard.</p>
        </form>
      </div>
    </section>
  );
}
