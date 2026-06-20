export function Toggle({ on, onClick, labelOn = 'On', labelOff = 'Off' }) {
  return (
    <button onClick={onClick} type="button"
      className={`inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full border transition ${on ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-stone-50 border-line text-body'}`}>
      <span className={`w-2 h-2 rounded-full ${on ? 'bg-emerald-500' : 'bg-stone-400'}`} />
      {on ? labelOn : labelOff}
    </button>
  );
}

export function StatCard({ label, value, hint, to }) {
  const inner = (
    <div className="bg-white border border-line rounded-2xl p-6 card-soft hover:border-gold/50 transition h-full">
      <div className="text-body text-xs tracking-wide uppercase">{label}</div>
      <div className="font-display text-4xl gold-text mt-2">{value}</div>
      {hint && <div className="text-body text-xs mt-1">{hint}</div>}
    </div>
  );
  return to ? <a href={to}>{inner}</a> : inner;
}

export function Empty({ title, sub }) {
  return (
    <div className="text-center py-20 border border-line rounded-2xl bg-white">
      <p className="font-display text-2xl text-ink">{title}</p>
      {sub && <p className="text-body mt-2 text-sm">{sub}</p>}
    </div>
  );
}

export function confirmThen(message, fn) {
  return () => { if (window.confirm(message)) fn(); };
}
