// Generates an on-brand SVG placeholder (ivory + gold) as a data URL.
// Used when a product has no uploaded image.
const PALETTES = [
  ['#FAF6EE', '#F0E6CF'], ['#F6EFE2', '#EAD9B6'], ['#FBF7F0', '#F1E2C4'],
  ['#F7F1E6', '#E9D6AE'], ['#FAF4E9', '#EFDCB8'],
];

export function placeholder(name = 'NEXORO', i = 0) {
  const [a, b] = PALETTES[i % PALETTES.length];
  const initial = (name.trim()[0] || 'N').toUpperCase();
  const safe = name.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/>
    </linearGradient>
    <linearGradient id='gold' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#C9A249'/><stop offset='.5' stop-color='#F0D67E'/><stop offset='1' stop-color='#8A6A22'/>
    </linearGradient>
  </defs>
  <rect width='800' height='600' fill='url(#g)'/>
  <circle cx='400' cy='270' r='150' fill='none' stroke='url(#gold)' stroke-width='3' opacity='.7'/>
  <text x='400' y='320' font-family='Georgia, serif' font-size='180' font-weight='700' fill='url(#gold)' text-anchor='middle'>${initial}</text>
  <text x='400' y='470' font-family='Inter, sans-serif' font-size='30' letter-spacing='6' fill='#8A6A22' text-anchor='middle'>${safe.toUpperCase().slice(0, 22)}</text>
  <text x='400' y='540' font-family='Georgia, serif' font-size='22' letter-spacing='10' fill='#B8893B' text-anchor='middle' opacity='.8'>NEXORO</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
