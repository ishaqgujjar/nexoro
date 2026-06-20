import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money, fmtDate } from '../lib/format';
import { ORDER_STATUSES } from '../lib/constants';
import { StatCard, Empty } from './ui';

export default function Dashboard() {
  const { products, orders, messages, wholesale, reviews } = useStore();
  const revenue = orders.filter((o) => ['paid', 'shipped', 'completed'].includes(o.status)).reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.isActive && p.stock <= 10);
  const recent = orders.slice(0, 6);
  const label = (s) => ORDER_STATUSES.find(([k]) => k === s)?.[1] || s;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Products" value={products.length} hint={`${products.filter((p) => p.isActive).length} active`} to="/admin/products" />
        <StatCard label="Orders" value={orders.length} hint={`${orders.filter((o) => o.status === 'pending' || o.status === 'verifying').length} need attention`} to="/admin/orders" />
        <StatCard label="Unread messages" value={messages.filter((m) => !m.isRead).length} hint={`${messages.length} total`} to="/admin/messages" />
        <StatCard label="Confirmed revenue" value={money(revenue)} hint="Paid / shipped / completed" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl card-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Recent orders</h2>
            <Link to="/admin/orders" className="text-gold text-sm hover:text-deep">View all →</Link>
          </div>
          {recent.length ? (
            <div className="divide-y divide-line">
              {recent.map((o) => (
                <div key={o.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium text-ink text-sm">{o.ref} · {o.fullName}</div>
                    <div className="text-body text-xs mt-0.5">{fmtDate(o.createdAt)} · {o.items.length} item{o.items.length === 1 ? '' : 's'}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-ink font-semibold text-sm">{money(o.total)}</div>
                    <div className="text-deep text-xs">{label(o.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="px-6 py-12 text-center text-body text-sm">No orders yet. They'll appear here after checkout.</div>}
        </div>

        <div className="bg-white border border-line rounded-2xl card-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Low stock</h2>
            <Link to="/admin/products" className="text-gold text-sm hover:text-deep">Manage →</Link>
          </div>
          {lowStock.length ? (
            <div className="divide-y divide-line">
              {lowStock.map((p) => (
                <div key={p.id} className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-sm text-ink truncate pr-3">{p.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.stock === 0 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>{p.stock} left</span>
                </div>
              ))}
            </div>
          ) : <div className="px-6 py-12 text-center text-body text-sm">All products are well stocked.</div>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/products/new" className="btn-gold rounded-2xl px-6 py-5 text-center text-sm">+ Add a new product</Link>
        <Link to="/admin/wholesale" className="btn-outline rounded-2xl px-6 py-5 text-center text-sm">{wholesale.filter((w) => !w.isReviewed).length} wholesale application(s) to review</Link>
      </div>
    </div>
  );
}
