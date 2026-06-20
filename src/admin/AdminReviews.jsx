import { useStore } from '../store/StoreContext';
import { fmtDate } from '../lib/format';
import Stars from '../components/Stars';
import { Toggle, Empty, confirmThen } from './ui';

export default function AdminReviews() {
  const { reviews, products, toggleReviewApproved, deleteReview, toast } = useStore();
  const nameOf = (pid) => products.find((p) => p.id === pid)?.name || 'Unknown product';
  return (
    <div className="space-y-4">
      <p className="text-body text-sm">{reviews.filter((r) => !r.isApproved).length} pending of {reviews.length} review{reviews.length === 1 ? '' : 's'}. Only approved reviews show on the store.</p>
      {reviews.length ? reviews.map((r) => (
        <div key={r.id} className={`bg-white border rounded-2xl card-soft p-5 ${r.isApproved ? 'border-line' : 'border-amber-200'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-medium text-ink">{r.name}</span>
                <Stars value={r.rating} className="text-sm" />
                <span className="text-body text-xs">on {nameOf(r.productId)}</span>
              </div>
              <p className="text-body text-sm mt-2 leading-relaxed">{r.comment}</p>
              <div className="text-body text-xs mt-3">{fmtDate(r.createdAt)}</div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Toggle on={r.isApproved} onClick={() => toggleReviewApproved(r.id)} labelOn="Approved" labelOff="Pending" />
              <button onClick={confirmThen('Delete this review?', () => { deleteReview(r.id); toast('Review deleted.'); })} className="text-red-500 hover:text-red-600 text-xs">Delete</button>
            </div>
          </div>
        </div>
      )) : <Empty title="No reviews" sub="Product reviews will appear here for moderation." />}
    </div>
  );
}
