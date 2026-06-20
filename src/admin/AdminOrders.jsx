import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { money, fmtDate } from '../lib/format';
import { ORDER_STATUSES } from '../lib/constants';
import { Empty, confirmThen } from './ui';

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder, toast } = useStore();
  const [open, setOpen] = useState(null);
  const [proof, setProof] = useState(null);

  return (
    <div className="space-y-5">
      <p className="text-body text-sm">{orders.length} order{orders.length === 1 ? '' : 's'}. Update status, preview payment proof, and review items.</p>

      {orders.length ? orders.map((o) => (
        <div key={o.id} className="bg-white border border-line rounded-2xl card-soft overflow-hidden">
          <div className="px-5 sm:px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg gold-text">{o.ref}</span>
                <span className="text-ink text-sm font-medium">{o.fullName}</span>
              </div>
              <div className="text-body text-xs mt-1">{fmtDate(o.createdAt)} · {o.email} · {o.phone}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-ink font-semibold">{money(o.total)}</span>
              <select value={o.status} onChange={(e) => { updateOrderStatus(o.id, e.target.value); toast(`Order ${o.ref} updated.`); }}
                className="bg-cream border border-line rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-gold">
                {ORDER_STATUSES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
              </select>
              <button onClick={() => setOpen(open === o.id ? null : o.id)} className="btn-outline rounded-full px-3 py-2 text-xs">{open === o.id ? 'Hide' : 'Details'}</button>
            </div>
          </div>

          {open === o.id && (
            <div className="border-t border-line px-5 sm:px-6 py-5 grid md:grid-cols-2 gap-6 bg-cream/40">
              <div>
                <h4 className="text-xs uppercase tracking-wide text-body mb-3">Items</h4>
                <div className="space-y-2">
                  {o.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-sm"><span className="text-ink">{it.productName} <span className="text-body">× {it.quantity}</span></span><span className="text-ink">{money(it.price * it.quantity)}</span></div>
                  ))}
                </div>
                <div className="hairline my-4" />
                <div className="flex justify-between text-sm font-medium"><span className="text-body">Total</span><span className="gold-text font-display text-lg">{money(o.total)}</span></div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wide text-body mb-3">Shipping & payment</h4>
                <p className="text-sm text-ink">{o.address}</p>
                <p className="text-sm text-body">{o.city}, {o.country}</p>
                {o.notes && <p className="text-sm text-body mt-2"><span className="text-ink">Notes:</span> {o.notes}</p>}
                <div className="mt-4">
                  {o.paymentProof
                    ? <button onClick={() => setProof(o.paymentProof)} className="btn-outline rounded-full px-4 py-2 text-xs">View payment proof</button>
                    : <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">No payment proof uploaded</span>}
                </div>
                <button onClick={confirmThen(`Delete order ${o.ref}?`, () => { deleteOrder(o.id); toast('Order deleted.'); })}
                  className="text-red-500 hover:text-red-600 text-xs mt-5 block">Delete order</button>
              </div>
            </div>
          )}
        </div>
      )) : <Empty title="No orders yet" sub="Orders placed at checkout will appear here." />}

      {proof && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5" onClick={() => setProof(null)}>
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <img src={proof} alt="Payment proof" className="w-full rounded-2xl border border-white/10" />
            <button onClick={() => setProof(null)} className="btn-gold rounded-full px-6 py-2.5 text-sm mt-4 mx-auto block">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
