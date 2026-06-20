import { useStore } from '../store/StoreContext';

export default function Toasts() {
  const { toasts } = useStore();
  if (!toasts.length) return null;
  return (
    <div className="fixed top-[88px] inset-x-0 z-[60] px-5 flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`pointer-events-auto max-w-md w-full text-sm rounded-xl px-4 py-3 border shadow-soft animate-[fadein_.3s_ease]
          ${t.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : t.type === 'error' ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-cream border-line text-body'}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
