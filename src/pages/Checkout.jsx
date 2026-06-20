import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money } from '../lib/format';
import { PAYMENT_DETAILS } from '../lib/constants';

const fileToDataUrl = (file) => new Promise((res, rej) => {
  const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file);
});

export default function Checkout() {
  const { cartItems, cartCount, cartTotal, placeOrder, toast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', country: 'Pakistan', notes: '' });
  const [proof, setProof] = useState(null);
  const [proofName, setProofName] = useState('');
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => { if (cartCount === 0) navigate('/products'); }, [cartCount, navigate]);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) { setProof(null); setProofName(''); return; }
    setProof(await fileToDataUrl(f)); setProofName(f.name);
  };
  const copyAcct = () => {
    navigator.clipboard.writeText(PAYMENT_DETAILS.account_number.replace(/\s+/g, ''));
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.fullName.trim()) er.fullName = 'This field is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid email address.';
    ['phone', 'address', 'city', 'country'].forEach((f) => { if (!form[f].trim()) er[f] = 'This field is required.'; });
    setErrors(er);
    if (Object.keys(er).length) return;
    const order = placeOrder({ ...form, paymentProof: proof });
    toast(`Order ${order.ref} placed successfully.`);
    navigate('/order-success', { state: { orderId: order.id } });
  };

  return (
    <section className="pt-[110px] pb-24 max-w-6xl mx-auto px-5 sm:px-8">
      <h1 className="reveal font-display text-4xl sm:text-5xl mb-2 text-ink">Checkout</h1>
      <p className="reveal text-body mb-10">Almost there — confirm your details and payment.</p>

      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8" noValidate>
        {Object.keys(errors).length > 0 && (
          <div className="lg:col-span-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">Please review the highlighted fields below and try again.</div>
        )}

        <div className="lg:col-span-2 space-y-8">
          <div className="reveal bg-white border border-line rounded-2xl p-7 card-soft">
            <h3 className="font-display text-xl mb-6 flex items-center gap-3 text-ink"><span className="w-7 h-7 rounded-full btn-gold text-sm font-bold flex items-center justify-center">1</span> Shipping details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="text-xs text-body mb-1.5 block">Full name</label><input className="field" placeholder="Full name" value={form.fullName} onChange={set('fullName')} />{errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}</div>
              <div><label className="text-xs text-body mb-1.5 block">Email</label><input className="field" placeholder="you@email.com" value={form.email} onChange={set('email')} />{errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}</div>
              <div><label className="text-xs text-body mb-1.5 block">Phone</label><input className="field" placeholder="+92 300 0000000" value={form.phone} onChange={set('phone')} />{errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}</div>
              <div className="sm:col-span-2"><label className="text-xs text-body mb-1.5 block">Address</label><textarea className="field" placeholder="Street address, house / flat no." value={form.address} onChange={set('address')} />{errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}</div>
              <div><label className="text-xs text-body mb-1.5 block">City</label><input className="field" placeholder="City" value={form.city} onChange={set('city')} />{errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}</div>
              <div><label className="text-xs text-body mb-1.5 block">Country</label><input className="field" placeholder="Country" value={form.country} onChange={set('country')} />{errors.country && <p className="text-red-600 text-xs mt-1">{errors.country}</p>}</div>
              <div className="sm:col-span-2"><label className="text-xs text-body mb-1.5 block">Order notes (optional)</label><textarea className="field" placeholder="Order notes (optional)" value={form.notes} onChange={set('notes')} /></div>
            </div>
          </div>

          <div className="reveal bg-white border border-line rounded-2xl p-7 card-soft">
            <h3 className="font-display text-xl mb-6 flex items-center gap-3 text-ink"><span className="w-7 h-7 rounded-full btn-gold text-sm font-bold flex items-center justify-center">2</span> Payment</h3>
            <p className="text-body text-sm mb-5">Transfer the total amount to the account below, then upload your payment screenshot to confirm your order.</p>
            <div className="rounded-xl border border-gold/30 bg-cream p-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-body">Bank</span><span className="text-ink font-medium">{PAYMENT_DETAILS.bank_name}</span></div>
              <div className="flex justify-between"><span className="text-body">Account title</span><span className="text-ink font-medium">{PAYMENT_DETAILS.account_title}</span></div>
              <div className="flex justify-between items-center"><span className="text-body">Account number</span><span className="text-deep font-mono tracking-wide font-semibold">{PAYMENT_DETAILS.account_number}</span></div>
              <div className="flex justify-between"><span className="text-body">IBAN</span><span className="text-ink font-mono text-xs">{PAYMENT_DETAILS.iban}</span></div>
              <button type="button" onClick={copyAcct} className="btn-outline rounded-full px-4 py-2 text-xs mt-2">{copied ? 'Copied ✓' : 'Copy account number'}</button>
            </div>
            <div className="mt-6">
              <label className="text-xs text-body mb-2 block">Upload payment screenshot (optional)</label>
              <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-body file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-gold file:text-white file:font-semibold hover:file:bg-deep file:cursor-pointer cursor-pointer" />
              {proofName && <p className="text-xs text-emerald-600 mt-2">Attached: {proofName}</p>}
              <p className="text-xs text-body mt-2">You can place the order now and email the proof later — but uploading here confirms it instantly.</p>
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="bg-white border border-line rounded-2xl p-7 sticky top-24 card-soft">
            <h3 className="font-display text-xl mb-5 text-ink">Your order</h3>
            <div className="space-y-4 max-h-72 overflow-auto pr-1">
              {cartItems.map(({ product, quantity, totalPrice }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="flex-1 text-sm"><div className="text-ink leading-tight">{product.name}</div><div className="text-body text-xs">Qty {quantity}</div></div>
                  <div className="text-sm text-ink">{money(totalPrice)}</div>
                </div>
              ))}
            </div>
            <div className="hairline my-6" />
            <div className="flex justify-between items-center"><span className="text-body">Total</span><span className="font-display text-2xl gold-text">{money(cartTotal)}</span></div>
            <button className="btn-gold w-full rounded-full px-6 py-4 text-sm mt-7">Place Order</button>
            <button type="button" onClick={() => navigate('/cart')} className="block w-full text-center text-xs text-body hover:text-gold transition mt-4">← Back to cart</button>
          </div>
        </div>
      </form>
    </section>
  );
}
