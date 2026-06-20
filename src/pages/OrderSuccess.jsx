import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money } from '../lib/format';
import { BRAND, ORDER_STATUSES } from '../lib/constants';

export default function OrderSuccess() {
  const { orders } = useStore();
  const { state } = useLocation();
  const order = orders.find((o) => o.id === state?.orderId) || orders[0];

  if (!order) {
    return (
      <section className="pt-[140px] pb-28 max-w-2xl mx-auto px-5 text-center">
        <h1 className="font-display text-4xl text-ink">No recent order</h1>
        <Link to="/products" className="btn-gold inline-block rounded-full px-8 py-3.5 mt-8 text-sm">Browse Products</Link>
      </section>
    );
  }
  const statusLabel = ORDER_STATUSES.find(([k]) => k === order.status)?.[1] || order.status;

  return (
    <section className="pt-[140px] pb-28 max-w-2xl mx-auto px-5 sm:px-8 text-center">
      <div className="reveal relative">
        <div className="glow soft w-72 h-72 -top-16 left-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-ink text-3xl shadow-gold">✓</div>
          <h1 className="font-display text-4xl sm:text-5xl mt-8 text-ink">Thank you, {order.fullName.split(' ')[0]}!</h1>
          <p className="text-body mt-4">Your order has been received and is now being processed. We'll verify your payment and prepare your items shortly.</p>
        </div>
      </div>

      <div className="reveal bg-white border border-line rounded-2xl p-7 mt-10 text-left card-soft">
        <div className="flex justify-between items-center pb-5 border-b border-line">
          <span className="text-body text-sm">Order reference</span>
          <span className="font-display text-xl gold-text">{order.ref}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 py-5 text-sm">
          <div><span className="text-body block text-xs">Total</span><span className="text-ink font-medium">{money(order.total)}</span></div>
          <div><span className="text-body block text-xs">Status</span><span className="text-deep font-medium">{statusLabel}</span></div>
          <div><span className="text-body block text-xs">Email</span><span className="text-ink break-all">{order.email}</span></div>
          <div><span className="text-body block text-xs">Payment proof</span><span className={order.paymentProof ? 'text-emerald-600' : 'text-body'}>{order.paymentProof ? 'Uploaded ✓' : 'Pending'}</span></div>
        </div>
        {!order.paymentProof && (
          <div className="border-t border-line pt-5 text-sm text-body">
            Haven't uploaded your payment screenshot yet? Email it to <a href={`mailto:${BRAND.email}`} className="text-gold">{BRAND.email}</a> with reference <strong className="text-ink">{order.ref}</strong>.
          </div>
        )}
      </div>

      <div className="reveal flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Link to="/products" className="btn-gold rounded-full px-8 py-3.5 text-sm">Continue Shopping</Link>
        <Link to="/" className="btn-outline rounded-full px-8 py-3.5 text-sm">Back to Home</Link>
      </div>
    </section>
  );
}
