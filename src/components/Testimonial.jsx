import Stars from './Stars';

export default function Testimonial({ t }) {
  return (
    <div className="w-[340px] shrink-0 bg-white border border-line rounded-2xl p-7 card-soft">
      <Stars value={t.rating} className="text-sm mb-4" />
      <p className="text-body leading-relaxed text-[15px]">“{t.quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-gold text-ink font-bold flex items-center justify-center">{t.name[0]?.toUpperCase()}</div>
        <div>
          <div className="text-ink text-sm font-medium">{t.name}</div>
          {t.role && <div className="text-body/80 text-xs">{t.role}</div>}
        </div>
      </div>
    </div>
  );
}
