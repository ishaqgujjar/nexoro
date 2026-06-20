import { useStore } from '../store/StoreContext';
import { fmtDate } from '../lib/format';
import { Toggle, Empty, confirmThen } from './ui';

export default function AdminWholesale() {
  const { wholesale, toggleWholesaleReviewed, deleteWholesale, toast } = useStore();
  return (
    <div className="space-y-4">
      <p className="text-body text-sm">{wholesale.filter((w) => !w.isReviewed).length} new of {wholesale.length} application{wholesale.length === 1 ? '' : 's'}.</p>
      {wholesale.length ? wholesale.map((w) => (
        <div key={w.id} className={`bg-white border rounded-2xl card-soft p-5 ${w.isReviewed ? 'border-line' : 'border-gold/40'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-ink">{w.businessName}</span>
                <span className="text-body text-sm">· {w.fullName}</span>
              </div>
              <div className="text-sm mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <a href={`mailto:${w.email}`} className="text-gold hover:text-deep">{w.email}</a>
                <span className="text-body">{w.phone}</span>
                <span className="text-body">{w.country}</span>
                {w.monthlyVolume && <span className="text-body">Vol: {w.monthlyVolume}</span>}
              </div>
              {w.message && <p className="text-body text-sm mt-2 leading-relaxed whitespace-pre-line">{w.message}</p>}
              <div className="text-body text-xs mt-3">{fmtDate(w.createdAt)}</div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Toggle on={w.isReviewed} onClick={() => toggleWholesaleReviewed(w.id)} labelOn="Reviewed" labelOff="New" />
              <button onClick={confirmThen('Delete this application?', () => { deleteWholesale(w.id); toast('Application deleted.'); })} className="text-red-500 hover:text-red-600 text-xs">Delete</button>
            </div>
          </div>
        </div>
      )) : <Empty title="No applications" sub="Wholesale applications will appear here." />}
    </div>
  );
}
