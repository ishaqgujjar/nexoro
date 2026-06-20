export default function Stars({ value = 0, className = '' }) {
  return (
    <span className={`stars ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(value) ? '' : 'off'}>★</span>
      ))}
    </span>
  );
}
