import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money } from '../lib/format';
import { placeholder } from '../lib/placeholder';
import Stars from './Stars';

export default function ProductCard({ product, index = 0 }) {
  const { categoryById, avgRating, reviewCount, discountPercent } = useStore();
  const cat = categoryById[product.categoryId];
  const rc = reviewCount(product.id);
  const inStock = product.stock > 0;
  const disc = discountPercent(product);
  const img = product.image || placeholder(product.name, index);

  return (
    <article className="reveal lift group bg-white border border-line rounded-2xl overflow-hidden flex flex-col card-soft">
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3] bg-cream">
        <img src={img} alt={product.name} className="w-full h-full object-cover transition duration-[800ms] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        {disc > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-br from-accent to-gold text-ink text-xs font-bold px-2.5 py-1 rounded-full shadow-gold">−{disc}%</span>
        )}
        {!inStock && (
          <span className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center text-ink/70 text-sm tracking-widest uppercase font-medium">Sold out</span>
        )}
        <span className="absolute bottom-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 bg-white text-ink text-xs font-medium px-3.5 py-2 rounded-full shadow-soft border border-line">View details →</span>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        {cat && <span className="text-[11px] tracking-[.22em] uppercase text-deep/90">{cat.name}</span>}
        <h3 className="font-display text-lg mt-1.5 leading-snug">
          <Link to={`/product/${product.slug}`} className="hover:text-gold transition">{product.name}</Link>
        </h3>
        {rc > 0 ? (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-body">
            <Stars value={avgRating(product.id)} /><span>{avgRating(product.id)} ({rc})</span>
          </div>
        ) : (
          <div className="text-xs text-body/70 mt-1.5">New arrival</div>
        )}
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <span className="text-ink text-lg font-semibold">{money(product.price)}</span>
            {product.compareAtPrice && <span className="text-body/60 text-sm line-through ml-1.5">{money(product.compareAtPrice)}</span>}
          </div>
          <Link to={`/product/${product.slug}`} className="btn-gold rounded-full px-4 py-2 text-xs tracking-wide">View</Link>
        </div>
      </div>
    </article>
  );
}
