import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import Stars from '../components/Stars';
import { Toggle, Empty, confirmThen } from './ui';

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, toggleTestimonialActive, deleteTestimonial, toast } = useStore();
  const [form, setForm] = useState({ name: '', role: '', rating: 5, quote: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) { toast('Name and quote are required.', 'error'); return; }
    addTestimonial({ ...form, rating: Number(form.rating) });
    setForm({ name: '', role: '', rating: 5, quote: '' });
    toast('Testimonial added.');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <form onSubmit={submit} className="bg-white border border-line rounded-2xl card-soft p-6 space-y-4 sticky top-24">
          <h3 className="font-display text-xl text-ink">Add testimonial</h3>
          <input className="field" placeholder="Customer name" value={form.name} onChange={set('name')} />
          <input className="field" placeholder="Role / location (optional)" value={form.role} onChange={set('role')} />
          <select className="field" value={form.rating} onChange={set('rating')}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}</select>
          <textarea className="field" placeholder="Quote…" value={form.quote} onChange={set('quote')} />
          <button className="btn-gold rounded-full px-6 py-3 text-sm w-full">Add testimonial</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        {testimonials.length ? testimonials.map((t) => (
          <div key={t.id} className={`bg-white border rounded-2xl card-soft p-5 ${t.isActive ? 'border-line' : 'border-stone-200 opacity-70'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3"><span className="font-medium text-ink">{t.name}</span><Stars value={t.rating} className="text-sm" /></div>
                {t.role && <div className="text-body text-xs mt-0.5">{t.role}</div>}
                <p className="text-body text-sm mt-2 leading-relaxed">“{t.quote}”</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <Toggle on={t.isActive} onClick={() => toggleTestimonialActive(t.id)} labelOn="Shown" labelOff="Hidden" />
                <button onClick={confirmThen('Delete this testimonial?', () => { deleteTestimonial(t.id); toast('Testimonial deleted.'); })} className="text-red-500 hover:text-red-600 text-xs">Delete</button>
              </div>
            </div>
          </div>
        )) : <Empty title="No testimonials" sub="Add testimonials to show on the home page." />}
      </div>
    </div>
  );
}
